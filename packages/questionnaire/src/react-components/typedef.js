import { RawDraftContentState } from 'draft-js'

/**
 *  @typedef {Object} Condition
 *  @property {Question} formField
 *  @property {('is'|'not'|'include'|'exclude')} compare
 *  @property {Option[]} option
 */

/**
 *  @typedef {Object} FormCondition
 *  @property {string} id
 *  @property {number} order
 *  @property {('AND'|'OR')} type
 *  @property {Condition[]} condition
 *  @property {Answer} [answer]
 *  @property {Question} [next] - next question
 *  @property {string} [goOut] - a hyperlink to other webpage
 */

/**
 *  @typedef {Object} Answer
 *  @property {string} id
 *  @property {string} name
 *  @property {RawDraftContentState} content
 */

/**
 *  @typedef {Object} Option
 *  @property {string} id
 *  @property {string} name
 *  @property {string} value
 */

/**
 *  @typedef {Object} Question
 *  @property {string} id
 *  @property {number} [number]
 *  @property {string} name
 *  @property {('single'|'multiple'|'text'|'checkbox')} type
 *  @property {number} sortOrder
 *  @property {Option[]} options
 */

/**
 *  @typedef {Object} ImageObj
 *  @property {Object} resized
 *  @property {string} original
 */

/**
 *  @typedef {Object} Form
 *  @property {Question[]} fields
 *  @property {Answer[]} answers
 *  @property {FormCondition[]} conditions
 *  @property {string} name
 *  @property {Object} [content]
 *  @property {Object[]} content.blocks
 *  @property {string} content.blocks[].text
 *  @property {string} [updateTime]
 *  @property {ImageObj} [heroImage]
 *  @property {ImageObj} [mobileImage]
 */
