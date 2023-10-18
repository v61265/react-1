export default {}

/**
 * @typedef {Object}        NotifyObject
 * @property {string|null}  selectedOption
 * @property {Object.<string, number>}  optionSummary
 */

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
 * @property {Option[]} [options]
 * @property {string}   [selectedItem]
 * @property {(data: NotifyObject) => void} [notifyUpstream]
 */

/**
 * @typedef {Object}    Option
 * @property {string}   [id]
 * @property {string}   name
 * @property {string}   value
 * @property {string}   [iconUrl]
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
 * @typedef {Object}      OptionProps
 * @property {string}     label
 * @property {string}     value
 * @property {string}     iconSrc
 * @property {number}     statistic
 * @property {boolean}    selected
 * @property {() => void} onMouseUp
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

/**
 * @typedef {Object}                                    OptionAmountManager
 * @property {Object.<string, number> | null}           optionSummary
 * @property {(defaultOptions: string[], newOptions: string[]) => Promise<void>}       giveOptions
 */
