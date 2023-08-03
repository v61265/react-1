export default {}

/**
 * @typedef {Object}    Field
 * @property {string}   id
 * @property {string}   name
 * @property {string}   status
 * @property {'single' | 'text'}  type
 * @property {number | null}      sortOrder
 */

/**
 * @typedef {Object}    SingleOnly
 * @property {'single'} type
 * @property {string}   [thumbUpLabel]
 * @property {string}   [thumbDownLabel]
 * @property {string}   [identifier]
 */

/**
 * @typedef {Object}    TextOnly
 * @property {'text'}   type
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
 * @property {string}   name
 * @property {string}   type
 * @property {boolean}  active
 * @property {number}   fieldsCount
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
