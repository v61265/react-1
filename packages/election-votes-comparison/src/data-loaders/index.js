import axios from 'axios'
import errors from '@twreporter/errors'
import events from 'events'

/**
 *  @typedef {'data'|'error'} SupportEventType
 */

/**
 *  Example: 抓 2018 年台北市市議員的選舉結果
 *
 *  let dataLoader = new Loader({
 *    apiOrigin: 'https://whoareyou-gcs.readr.tw',
 *    year: '2018', // 年份
 *    type: 'councilMember', // 選舉類型
 *    district: 'taipeiCity', // 縣市
 *  })
 *
 *  // For server side rendering,
 *  // load data once.
 *  try {
 *    // fetch data once
 *    const data =  await dataLoader.loadData()
 *  } catch(err) {
 *    // handle error
 *  }
 *
 *  // For client side rendering,
 *  // load data periodically and make React component re-render
 *  useEffect(() => {
 *    const handleError = (errMsg, errObj) => {
 *      // do something for loading error
 *    }
 *
 *    const handleData = (data) => {
 *      // call React component `setState`
 *      setState(data)
 *    }
 *
 *    dataLoader.addEventListener('error', handleError)
 *    dataLoader.addEventListener('data', setState)
 *
 *    // after register event listener
 *    // start to load data periodically
 *    dataLoader.loadDataPeriodically()
 *
 *    return () => {
 *      dataLoader.removeEventListener('error', handleError)
 *      dataLoader.removeEventListener('data', setState)
 *      dataLoader = null
 *    }
 *  }, [])
 *
 */

export default class Loader {
  /** @type events.EventEmitter */
  eventEmitter = null
  apiOrigin = 'https://whoareyou-gcs.readr.tw/elections'
  year = ''
  district = ''
  type = ''
  dataTimer = null

  /**
   *  @constructor
   *  @param {Object} props
   *  @param {string} [props.apiOrigin='https://whoareyou-gcs.readr.tw/elections']
   *  @param {string} props.year
   *  @param {string} props.district
   *  @param {string} props.type
   */
  constructor({
    apiOrigin = 'https://whoareyou-gcs.readr.tw/elections',
    year,
    district,
    type,
  }) {
    this.eventEmitter = new events.EventEmitter()
    this.apiOrigin = apiOrigin
    this.year = year
    this.district = district
    this.type = type
  }

  /**
   *  Load data from web service.
   *  @returns {Promise<Object>}
   */
  async loadData() {
    try {
      const axiosRes = await axios.get(
        `${this.apiOrigin}/${this.year}/${this.type}/${this.district}.json`
      )
      return axiosRes?.data
    } catch (err) {
      const annotatedErr = errors.helpers.annotateAxiosError(err)
      throw annotatedErr
    }
  }

  /**
   *  Load data from web service,
   *  and take advantage of event emitter to pass data to the event subscribers.
   *  This functioe will take response header `Cache-Control`'s `max-age` into account.
   *  Value of `max-age` will be used to `setTimeout` a timer.
   *  When time is up, the timer will load data,
   *  and emit it again.
   *  if `max-age` is not defined, the default timeout will be 3600.
   *  @returns {Promise<void>}
   */
  async loadDataPeriodically() {
    const url = `${this.apiOrigin}/${this.year}/${this.type}/${this.district}.json`
    try {
      const axiosRes = await axios.get(url)

      this.eventEmitter.emit('data', axiosRes?.data)

      const cacheControl = axiosRes?.headers?.['cache-control']
      let maxAge = parseInt(cacheControl.match(/max-age=([\d]+)/)?.[1])
      if (isNaN(maxAge)) {
        maxAge = 3600
      }

      this.dataTimer = setTimeout(() => {
        this.loadDataPeriodically()
      }, maxAge * 1000)
    } catch (err) {
      let annotatedErr = errors.helpers.annotateAxiosError(err)
      annotatedErr = errors.helpers.wrap(
        annotatedErr,
        'DataLoaderError',
        `Error to load data from ${url}`
      )
      this.eventEmitter.emit('error', annotatedErr)
    }
  }

  clearDataTimer() {
    clearTimeout(this.dataTimer)
    this.dataTimer = null
  }

  /**
   *  @param {SupportEventType} eventType
   *  @param {(...args: any[]) => void} cb
   *  @returns void
   */
  addEventListener(eventType, cb) {
    if (Loader.supportTypes.indexOf(eventType) > -1) {
      this.eventEmitter.addListener(eventType, cb)
    }
  }

  /**
   *  @param {SupportEventType} eventType
   *  @param {(...args: any[]) => void} cb
   *  @returns void
   */
  removeEventListener(eventType, cb) {
    if (Loader.supportTypes.indexOf(eventType) > -1) {
      this.eventEmitter.removeListener(eventType, cb)

      if (
        eventType === 'data' &&
        this.eventEmitter.listenerCount(eventType) === 0
      ) {
        this.clearDataTimer()
      }
    }
  }
}

// Event support types could be added or removed if necessarily
Loader.supportTypes = ['data', 'error']
Loader.electionTypes = [
  'president', // 總統
  'legislator', // 立法委員
  'mayor', // 縣市首長
  'councilMember', // 縣市議員
]
Loader.electionYears = [
  '1994',
  '1997',
  '1998',
  '2001',
  '2002',
  '2005',
  '2006',
  '2009',
  '2010',
  '2012',
  '2014',
  '2016',
  '2018',
  '2020',
  '2022',
]
Loader.electionDistricts = [
  'taipeiCity',
  'newTaipeiCity',
  'taoyuanCity',
  'taichungCity',
  'tainanCity',
  'kaohsiungCity',
  'hsinchuCounty',
  'miaoliCounty',
  'changhuaCounty',
  'nantouCounty',
  'yunlinCounty',
  'chiayiCounty',
  'pingtungCounty',
  'yilanCounty',
  'hualienCounty',
  'taitungCounty',
  'penghuCounty',
  'kinmenCounty',
  'lienchiangCounty',
  'keelungCity',
  'hsinchuCity',
  'chiayiCity',
]
