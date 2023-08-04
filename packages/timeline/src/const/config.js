/**
 * @typedef {Object} Dividers
 * @property {number} year
 * @property {number} month
 * @property {number} day
 *
 * @typedef {Object.<number, number[]>} BubbleLevelSizesInDivider
 *
 * @typedef {Object} DividerConfig
 * @property {Object} rwd
 * @property {Dividers} rwd.mobile
 * @property {Dividers} rwd.pc
 * @property {BubbleLevelSizesInDivider} bubbleLevelSizesInDivider
 *
 * @typedef {Object} RwdBreakpoint
 * @property {number} minWidth
 * @property {string} name
 *
 * @typedef {Object} HeaderHeightConfig
 * @property {Object} rwd
 * @property {number} rwd.mobile
 * @property {number} rwd.pc
 * @property {RwdBreakpoint[]} rwdBreakpoints
 *
 *
 * @typedef {Object} TimelineConfig - config from cms custom field
 * @property {DividerConfig} dividerConfig - dividers for rwd and each level
 * @property {HeaderHeightConfig} headerHeightConfig - page header size in rwd
 * @property {string} noEventContent - HTML string for event panel rendering content when no event
 */

/** @type {TimelineConfig} */
export const defaultConifg = {
  dividerConfig: {
    rwd: {
      mobile: {
        year: 5,
        month: 6,
        day: 7,
      },
      pc: {
        year: 5,
        month: 6,
        day: 7,
      },
    },
    bubbleLevelSizesInDivider: {
      5: [23, 36, 48, 60, 76],
      6: [23, 36, 48, 60, 66],
      7: [23, 28, 36, 48, 60],
    },
  },
  headerHeightConfig: {
    rwd: {
      mobile: 66,
      pc: 80,
    },
    rwdBreakpoints: [
      { minWidth: 0, name: 'mobile' },
      { minWidth: 568, name: 'pc' },
    ],
  },
  noEventContent: `
    <span
      style="
        text-align: center;
        font-size: 14px;
        line-height: 1.5;
        color: #989898;
      "
    >
      點擊泡泡
      <br />
      或往下滑動
    </span>
  `,
}
