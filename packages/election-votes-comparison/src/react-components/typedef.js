export default {}

/**
 *  @typedef {Object} Entity
 *  @property {string} label
 *  @property {string} [href]
 *  @property {string} [imgSrc]
 */

/**
 *  @typedef {Object} Candidate
 *  @property {number} number
 *  @property {Entity} name
 *  @property {Entity} party
 *  @property {number} votes
 *  @property {number} voteRate
 *  @property {boolean} elected
 */

/**
 *  @typedef {Object} ElectionDistrict
 *  @property {Candidate[]} candidates
 *  @property {number} number
 *  @property {string} type - value could be 'normal', 'plainIndigenous' or 'mountainIndigenous'
 */

/**
 *  @typedef {ElectionDistrict[]} ElectionDistricts
 */
