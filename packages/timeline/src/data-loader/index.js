import axios from 'axios'
import errors from '@twreporter/errors'

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
 */

export default class Loader {
  /**
   *  Load data from web service.
   *  @param {string} fetchTimelineUrl
   *  @returns {Promise<Object>}
   */
  async loadData(fetchTimelineUrl) {
    try {
      const axiosRes = await axios.get(fetchTimelineUrl)
      return axiosRes?.data
    } catch (err) {
      const annotatedErr = errors.helpers.annotateAxiosError(err)
      throw annotatedErr
    }
  }
}
