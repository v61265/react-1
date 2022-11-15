import axios from 'axios'
import errors from '@twreporter/errors'
import events from 'events'

/**
 *  @typedef {'data'|'error'} SupportEventType
 *  @typedef {import('../react-components/typedef').CouncilMemberElection} CouncilMemberElection
 *  @typedef {import('../react-components/typedef').CountyMayorElection} CountyMayorElection
 *  @typedef {import('../react-components/typedef').LegislatorElection} LegislatorElection
 *  @typedef {import('../react-components/typedef').LegislatorPartyElection} LegislatorPartyElection
 *  @typedef {import('../react-components/typedef').PresidentElection} PresidentElection
 *  @typedef {import('../react-components/typedef').ReferendumElection} ReferendumElection
 */

export default class Loader {
  /** @type events.EventEmitter */
  eventEmitter = null
  apiUrl = 'https://whoareyou-gcs.readr.tw/elections'
  version = 'v2'

  /**
   *  @constructor
   *  @param {Object} props
   *  @param {string} [props.apiUrl='https://whoareyou-gcs.readr.tw']
   *  @param {string} [props.version=v2]
   */
  constructor({
    apiUrl = 'https://whoareyou-gcs.readr.tw/elections',
    version = 'v2',
  }) {
    this.eventEmitter = new events.EventEmitter()
    this.apiUrl = apiUrl
    this.version = version === 'v1' ? '' : version
  }

  /**
   *  Load data from web service.
   *  @throws Error
   *  @returns {Promise<Object>}
   */
  async loadData({ year, type, district }) {
    try {
      const axiosRes = await axios.get(
        `${this.apiUrl}/${this.version}/${year}/${type}/${district}.json`
      )
      return axiosRes?.data
    } catch (err) {
      const annotatedErr = errors.helpers.annotateAxiosError(err)
      throw annotatedErr
    }
  }

  /**
   *  @typedef {'all'|'normal'|'indigenous'|'mountainIndigenous'|'plainIndigenous'} CouncilMemberType
   */

  /**
   *  Load data from web service.
   *  @param {Object} props
   *  @param {string} props.year
   *  @param {string} props.district - county/city name, see `Loader.electionDistricts` for more info
   *  @param {CouncilMemberType[]} [props.includes=['all']]
   *  @throws Error
   *  @returns {Promise<CouncilMemberElection>}
   */
  async loadCouncilMemberData({ year, district, includes = ['all'] }) {
    let data
    data = await this.loadData({
      type: 'councilMember',
      year,
      district,
    })

    if (includes?.indexOf('all') > -1) {
      return data
    }

    const districts = []

    data?.districts?.forEach((d) => {
      if (includes.indexOf(d?.type) > -1) {
        switch (d?.type) {
          case 'plainIndigenous': {
            d.fullDistrictName = `第${d.districtName}選區（平地）`
            districts.push(d)
            break
          }

          case 'mountainIndigenous': {
            d.fullDistrictName = `第${d.districtName}選區（山地）`
            districts.push(d)
            break
          }

          case 'normal':
          case 'indigenous': {
            d.fullDistrictName = `第${d.districtName}選區`
            districts.push(d)
            break
          }
          default: {
            // do nothing
          }
        }
      }
    })
    data.districts = districts

    return data
  }

  /**
   *  @param {Object} props
   *  @param {string} props.year
   *  @param {'indigenous'|'party'|'district'} props.type
   *  @param {string} [props.district] - avaliable only when `type` is `district`
   *  @throws Error
   *  @returns {Promise<LegislatorElection> | Promise<LegislatorPartyElection>}
   */
  loadLegislaterData({ year, type, district }) {
    switch (type) {
      case 'indigenous': {
        return this.loadData({
          type: 'legislater',
          district: 'indigenous',
          year,
        })
      }
      case 'party': {
        return this.loadData({
          type: 'legislater',
          district: 'party',
          year,
        })
      }
      case 'district': {
        return this.loadData({
          type: 'legislater',
          district,
          year,
        })
      }
      default: {
        throw new Error(
          'type should be either "indigenous", "party" or "district"'
        )
      }
    }
  }

  /**
   *  @param {Object} props
   *  @param {string} props.year
   *  @throws Error
   *  @returns {Promise<PresidentElection>}
   */
  loadPresidentData({ year }) {
    return this.loadData({
      type: 'president',
      year,
      district: 'all',
    })
  }

  /**
   *  @param {Object} props
   *  @param {string} props.year
   *  @throws Error
   *  @returns {Promise<CountyMayorElection>}
   */
  loadMayorData({ year }) {
    return this.loadData({
      type: 'mayor',
      year,
      district: 'all',
    })
  }

  /**
   *  @param {Object} props
   *  @param {string} props.year
   *  @throws Error
   *  @returns {Promise<ReferendumElection>}
   */
  loadReferendumData({ year }) {
    return this.loadData({
      type: 'referendum',
      year,
      district: 'all',
    })
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
