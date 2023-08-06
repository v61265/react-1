export default {}

/**
 * @typedef {Object}    Field
 * @property {string}   id
 * @property {string}   name
 * @property {string}   [status]
 * @property {string}  type
 * @property {number | null}      [sortOrder]
 * @property {string}   [identifier]
 */

/**
 * @typedef {Object}    SingleOnly
 * @property {string}   [thumbUpLabel]
 * @property {string}   [thumbDownLabel]
 */

/**
 * @typedef {Object}    TextOnly
 * @property {string}   [commentListTitle]
 * @property {boolean}  [shouldShowItemControl]
 */

/**
 * @typedef {Field & SingleOnly} SingleField
 */

/**
 * @typedef {Field & TextOnly} TextField
 */

/**
 * @typedef {Object}    Form
 * @property {string}   id
 * @property {string}   [name]
 * @property {string}   [type]
 * @property {boolean}  [active]
 * @property {number}   [fieldsCount]
 * @property {(SingleField|TextField)[]} fields
 */

/**
 * @typedef {Object}      ThumbsFieldProps
 * @property {boolean}    thumbsUp
 * @property {() => void} onMouseDown
 * @property {() => void} onMouseUp
 * @property {boolean}    checked
 * @property {boolean}    pressing
 * @property {string}     label
 * @property {number}     statistic
 */

/**
 * @typedef {Object}  Comment
 * @property {string} id
 * @property {string} date
 * @property {string} content
 */

/**
 * @typedef {Object}                            CommentManager
 * @property {Comment[]}                        comments
 * @property {boolean}                          noMoreComment
 * @property {() => Promise<void>}              loadMoreComments
 * @property {(value: string) => Promise<void>} postComment
 */

/**
 * @typedef {Object}  ThumbAmount
 * @property {number} thumbUp
 * @property {number} thumbDown
 */

/**
 * @typedef {Object}                                    ThumbAmountManager
 * @property {ThumbAmount | null}                       thumbsUp
 * @property {(value: boolean | null) => Promise<void>} giveThumbUp
 */
