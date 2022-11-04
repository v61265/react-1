import axios from 'axios'
import errors from '@twreporter/errors'
import events from 'events'

/**
 *  @typedef {'data'|'error'} SupportEventType
 */

/**
 *  Example:
 *
 *  let dataLoader = new Loader()
 *
 *  // For server side rendering,
 *  // load data once.
 *  try {
 *    // fetch data once
 *    const data =  await dataLoader.loadData('/files/liveblogs/ukraine-war.json')
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
 *    dataLoader.addEventListener('data', handleData)
 *
 *    // after register event listener
 *    // start to load data periodically
 *    dataLoader.loadDataPeriodically()
 *
 *    return () => {
 *      dataLoader.removeEventListener('error', handleError)
 *      dataLoader.removeEventListener('data', handleData)
 *      dataLoader = null
 *    }
 *  }, [])
 *
 */

export default class Loader {
  /** @type events.EventEmitter */
  eventEmitter = null
  dataTimer = null

  /**
   *  @constructor
   */
  constructor() {
    this.eventEmitter = new events.EventEmitter()
  }

  /**
   *  Load data from web service.
   *  @param {string} fetchLiveblogUrl
   *  @returns {Promise<Object>}
   */
  async loadData(fetchLiveblogUrl) {
    try {
      const axiosRes = await axios.get(fetchLiveblogUrl)
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
  async loadDataPeriodically(fetchLiveblogUrl) {
    try {
      const axiosRes = await axios.get(fetchLiveblogUrl)

      this.eventEmitter.emit('data', axiosRes?.data)

      const cacheControl = axiosRes?.headers?.['cache-control']
      let maxAge = parseInt(cacheControl.match(/max-age=([\d]+)/)?.[1])
      if (isNaN(maxAge)) {
        maxAge = 60 // seconds
      }

      this.dataTimer = setTimeout(() => {
        this.loadDataPeriodically(fetchLiveblogUrl)
      }, maxAge * 1000)
    } catch (err) {
      let annotatedErr = errors.helpers.annotateAxiosError(err)
      annotatedErr = errors.helpers.wrap(
        annotatedErr,
        'DataLoaderError',
        `Error to load data from ${fetchLiveblogUrl}`
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
