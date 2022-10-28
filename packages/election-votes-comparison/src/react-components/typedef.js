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
 *  @typedef {Object} District
 *  @property {Candidate[]} candidates
 *  @property {string} districtName
 *  @property {string} [fullDistrictName]
 *  @property {string} [type] - value could be 'normal', 'plainIndigenous', 'mountainIndigenous' or 'indigenous'
 */

/**
 *  @typedef {Object} Election
 *  @property {string} title
 *  @property {string} year
 *  @property {'councilMember'|'mayor'|'legislator'|'president'|'referendum'} [type]
 *  @property {District[]} districts
 */

/**
 *  @typedef {Election} CouncilMemberElection
 */

/**
 *  @typedef {Election} CountyMayorElection
 */

/**
 *  @typedef {Election} LegislatorElection
 */

/**
 *  @typedef {Object} PresidentCandidate
 *  @property {string} candNo
 *  @property {Entity[]} names
 *  @property {Entity[]} parties
 *  @property {number} tks
 *  @property {number} tksRate
 *  @property {boolean} candVictor
 */

/**
 *  @typedef {Election} PresidentElection
 *  @property {PresidentCandidate[]} candidates
 */

// TODO: add PartyLegislatorElection and Referendum
/**
 *  @typedef {Election} PartyLegislatorElection
 */

/**
 *  @typedef {Election} Referendum
 */
