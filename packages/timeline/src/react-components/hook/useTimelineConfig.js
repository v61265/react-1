import { useEffect, useState } from 'react'

/**
 * @typedef {Object} ProcessedTimelineConfig
 * @property {number} headerHeight
 * @property {import('../../const/config').Dividers} dividers
 * @property {import('../../const/config').BubbleLevelSizesInDivider} bubbleLevelSizesInDivider
 * @property {string} noEventContent
 */

/**
 * @param {import('../../const/config').TimelineConfig} config
 * @returns {ProcessedTimelineConfig}
 */
export function useTimelineConfig(config) {
  const { dividerConfig, headerHeightConfig, noEventContent } = config
  const { rwd: dividerRwd, bubbleLevelSizesInDivider } = dividerConfig
  const {
    rwd: headerRwd,
    rwdBreakpoints: headerRwdBreakpoints,
  } = headerHeightConfig

  const [device, setDevice] = useState('mobile')
  const [headerHeight, setHeaderHeight] = useState(headerRwd[device])
  /** @type {import('../../const/config').Dividers} */
  const dividers = dividerRwd[device]

  useEffect(() => {
    const windowWidth = window.screen.width
    const rwdBreakpoint = headerRwdBreakpoints
      .reverse()
      .find((rwdBreakpoint) => {
        return windowWidth >= rwdBreakpoint.minWidth
      })
    setHeaderHeight(headerRwd[rwdBreakpoint.name])
    if (windowWidth >= 768) {
      setDevice('pc')
    }
  }, [])

  return { headerHeight, dividers, bubbleLevelSizesInDivider, noEventContent }
}
