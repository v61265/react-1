/**
 * @typedef {Object} Liveblog
 * @property {string} id
 * @property {boolean} active
 * @property {string} createdAt
 * @property {string} defaultMeasures
 * @property {string} desc
 * @property {string} displayType
 * @property {Object} heroImage
 * @property {number} liveblog_itemsCount
 * @property {string} maxMeasures
 * @property {string} name
 * @property {Object} publisher
 * @property {string} slug
 * @property {string} sort
 * @property {string[]} tags
 * @property {string} updatedAt
 * @property {LiveblogItem[]} liveblog_items
 *
 * @typedef {Object} LiveblogItem
 * @property {string} author
 * @property {boolean} boost
 * @property {string} createdAt
 * @property {string} displayDateString
 * @property {string} external
 * @property {string} externalCoverPhoto
 * @property {Object} heroImage
 * @property {string} id
 * @property {string} imageCaption
 * @property {Object} name
 * @property {string} publishTime
 * @property {string} status
 * @property {string[]} tags
 * @property {string} title
 * @property {string} type
 * @property {string} updatedAt
 *
 * @typedef {Object} Timeline
 * @property {string} id
 * @property {boolean} active
 * @property {string} createdAt
 * @property {string} defaultMeasures
 * @property {string} displayType
 * @property {number} timelineItemsCount
 * @property {string} maxMeasures
 * @property {string} slug
 * @property {string} sort
 * @property {string[]} tags
 * @property {string} updatedAt
 * @property {TimelineEvent[]} timelineEvents
 *
 * @typedef {Object} TimelineEvent
 * @property {string} author
 * @property {boolean} boost
 * @property {string} createdAt
 * @property {string} displayDateString
 * @property {string} external
 * @property {string} externalCoverPhoto
 * @property {Object} heroImage
 * @property {string} id
 * @property {string} imageCaption
 * @property {Object} name
 * @property {string} publishTime
 * @property {string} status
 * @property {string[]} tags
 * @property {string} title
 * @property {string} type
 * @property {string} updatedAt
 */

/**
 * @param {Liveblog} liveblog
 * @returns {Timeline}
 */
export function transformLiveblogToTimeline(liveblog) {
  if (!liveblog) {
    return
  }

  const tagsSet = liveblog.liveblog_items.reduce((tagsSet, item) => {
    item.tags.forEach((tag) => tagsSet.add(tag.name))
    return tagsSet
  }, new Set())

  return {
    id: liveblog.id,
    active: liveblog.active,
    createdAt: liveblog.createdAt,
    defaultMeasures: liveblog.defaultMeasures,
    displayType: liveblog.displayType,
    timelineItemsCount: liveblog.timelineItemsCount,
    maxMeasures: liveblog.maxMeasures,
    slug: liveblog.slug,
    sort: liveblog.sort,
    tags: Array.from(tagsSet),
    updatedAt: liveblog.updatedAt,
    timelineEvents: liveblog.liveblog_items,
    conifg: liveblog.hint,
  }
}

export function getSortedTimelineFromLiveblog(liveblog) {
  const timeline = transformLiveblogToTimeline(liveblog)
  const isAsc = timeline.sort === 'asc' // default to 'desc'
  timeline.timelineEvents = sortTimelineEvents(timeline.timelineEvents, isAsc)
  return timeline
}

function getLevelFromMeasure(measures) {
  switch (measures) {
    case 'year':
      return 4
    case 'month':
      return 3
    case 'day':
      return 2
    case 'event':
      return 1
    default:
      return 4
  }
}

export function getMeasureFromLevel(level) {
  switch (level) {
    case 4:
      return 'year'
    case 3:
      return 'month'
    case 2:
      return 'day'
    case 1:
      return 'event'
    default:
      return 'year'
  }
}

function getTimelineKeys(timestamp) {
  const d = new Date(timestamp)
  let year = '' + d.getFullYear()
  let month = '' + (d.getMonth() + 1)
  month = month.length < 2 ? '0' + month : month
  let day = '' + d.getDate()
  day = day.length < 2 ? '0' + day : day
  let hour = '' + d.getHours()
  hour = hour.length < 2 ? '0' + hour : hour
  let minute = '' + d.getMinutes()
  minute = minute.length < 2 ? '0' + minute : minute
  const yearKey = year
  const monthKey = year + month
  const dayKey = year + month + day
  const eventKey = year + month + day + hour + minute
  return { yearKey, monthKey, dayKey, eventKey }
}

/**
 * @param {Date} date
 * @param {'year' | 'month' | 'day'} measure
 * @returns
 */
function convertDateToTimeKey(date, measure) {
  switch (measure) {
    case 'year':
      return date.getFullYear().toString()
    case 'month':
      return (
        date.getFullYear().toString() +
        (date.getMonth() + 1).toString().padStart(2, 0)
      )
    case 'day':
    default:
      return (
        date.getFullYear().toString() +
        (date.getMonth() + 1).toString().padStart(2, 0) +
        date
          .getDate()
          .toString()
          .padStart(2, 0)
      )
  }
}

function convertTimeKeyToDate(timeKey, measure) {
  switch (measure) {
    case 'day':
      return new Date(
        timeKey.slice(0, 4),
        timeKey.slice(4, 6) - 1,
        timeKey.slice(6)
      )
    case 'month':
      return new Date(timeKey.slice(0, 4), timeKey.slice(4) - 1)
    case 'year':
    default:
      return new Date(timeKey.slice(0, 4))
  }
}

export function sortTimelineEvents(events, isAsc) {
  return events.sort((eventA, eventB) => {
    if (eventA.publishTime === eventB.publishTime) {
      return isAsc ? eventA.id - eventB.id : eventB - eventA
    }
    const d1 = new Date(eventA.publishTime)
    const d2 = new Date(eventB.publishTime)
    return isAsc ? d1 - d2 : d2 - d1
  })
}

export function generateTimelineData(timeline, filterTags) {
  const timelineEvents = timeline.timelineEvents
  const yearEvents = { empty: [] }
  let yearKeys = new Set()
  const monthEvents = { empty: [] }
  let monthKeys = new Set()
  const dayEvents = { empty: [] }
  let dayKeys = new Set()
  const events = {}
  let eventKeys = new Set()
  let allTags = new Set()

  for (let event of timelineEvents) {
    event.tags.forEach((tag) => allTags.add(tag.name))
    let skip = false
    if (filterTags.length !== 0 && event.tags.length === 0) {
      skip = true
    } else if (filterTags.length !== 0) {
      // conditionally skip
      const keep = event.tags.reduce((keep, tag) => {
        if (keep) {
          return keep
        } else {
          return filterTags.includes(tag.name)
        }
      }, false)
      skip = !keep
    }
    if (skip) {
      continue
    }
    const { yearKey, monthKey, dayKey, eventKey } = getTimelineKeys(
      event.publishTime
    )
    if (Array.isArray(yearEvents[yearKey])) {
      yearEvents[yearKey].push(event)
    } else {
      yearEvents[yearKey] = [event]
    }
    yearKeys.add(yearKey)
    if (Array.isArray(monthEvents[monthKey])) {
      monthEvents[monthKey].push(event)
    } else {
      monthEvents[monthKey] = [event]
    }
    monthKeys.add(monthKey)
    if (Array.isArray(dayEvents[dayKey])) {
      dayEvents[dayKey].push(event)
    } else {
      dayEvents[dayKey] = [event]
    }
    dayKeys.add(dayKey)
    let uniqueEventKey = eventKey.padEnd(15, '0')
    // since some events have same timestamp, add three digits to create unique key
    while (true) {
      if (events[uniqueEventKey]) {
        uniqueEventKey = (parseInt(uniqueEventKey) + 1).toString()
      } else {
        events[uniqueEventKey] = event
        break
      }
    }
    eventKeys.add(uniqueEventKey)
  }

  yearKeys = Array.from(yearKeys)
  monthKeys = Array.from(monthKeys)
  dayKeys = Array.from(dayKeys)
  eventKeys = Array.from(eventKeys)
  allTags = Array.from(allTags)

  const yearMax = yearKeys.reduce((max, yearKey) => {
    const events = yearEvents[yearKey]
    return events.length > max ? events.length : max
  }, 0)
  const monthMax = monthKeys.reduce((max, monthKey) => {
    const events = monthEvents[monthKey]
    return events.length > max ? events.length : max
  }, 0)
  const dayMax = dayKeys.reduce((max, dayKey) => {
    const events = dayEvents[dayKey]
    return events.length > max ? events.length : max
  }, 0)

  let yearKeysToRender = [...yearKeys]
  yearKeysToRender = yearKeysToRender.reduce((newYearKeys, yearKey) => {
    if (newYearKeys.length === 0) {
      newYearKeys.push(yearKey)
    } else {
      const d = convertTimeKeyToDate(yearKey, 'year')
      const preYearKey = newYearKeys[newYearKeys.length - 1]
      const preD = convertTimeKeyToDate(preYearKey, 'year')
      const continuousD = new Date(preD)
      continuousD.setFullYear(continuousD.getFullYear() + 1)

      let safeThreshold = 0
      while (
        convertDateToTimeKey(continuousD, 'year') !==
        convertDateToTimeKey(d, 'year')
      ) {
        newYearKeys.push(convertDateToTimeKey(continuousD, 'year'))
        continuousD.setFullYear(continuousD.getFullYear() + 1)
        safeThreshold++
        if (safeThreshold >= 5) break
      }

      newYearKeys.push(yearKey)
    }
    return newYearKeys
  }, [])
  let monthKeysToRender = [...monthKeys]
  monthKeysToRender = monthKeysToRender.reduce((newMonthKeys, monthKey) => {
    if (newMonthKeys.length === 0) {
      newMonthKeys.push(monthKey)
    } else {
      const d = convertTimeKeyToDate(monthKey, 'month')
      const preMonthKey = newMonthKeys[newMonthKeys.length - 1]
      const preD = convertTimeKeyToDate(preMonthKey, 'month')
      const continuousD = new Date(preD)
      continuousD.setMonth(continuousD.getMonth() + 1)

      let safeThreshold = 0
      while (
        convertDateToTimeKey(continuousD, 'month') !==
        convertDateToTimeKey(d, 'month')
      ) {
        newMonthKeys.push(convertDateToTimeKey(continuousD, 'month'))
        continuousD.setMonth(continuousD.getMonth() + 1)
        safeThreshold++
        if (safeThreshold >= 100) break
      }

      newMonthKeys.push(monthKey)
    }
    return newMonthKeys
  }, [])
  let dayKeysToRender = [...dayKeys]
  dayKeysToRender = dayKeysToRender.reduce((newDayKeys, dayKey) => {
    if (newDayKeys.length === 0) {
      newDayKeys.push(dayKey)
    } else {
      const d = convertTimeKeyToDate(dayKey, 'day')
      const preDayKey = newDayKeys[newDayKeys.length - 1]
      const preD = convertTimeKeyToDate(preDayKey, 'day')
      const continuousD = new Date(preD)
      continuousD.setDate(continuousD.getDate() + 1)

      let safeThreshold = 0
      while (
        convertDateToTimeKey(continuousD, 'day') !==
        convertDateToTimeKey(d, 'day')
      ) {
        newDayKeys.push(convertDateToTimeKey(continuousD, 'day'))
        continuousD.setDate(continuousD.getDate() + 1)
        safeThreshold++
        if (safeThreshold >= 1000) break
      }

      newDayKeys.push(dayKey)
    }
    return newDayKeys
  }, [])

  return {
    timeEvents: {
      year: yearEvents,
      month: monthEvents,
      day: dayEvents,
      event: events,
    },
    timeKeys: {
      year: yearKeys,
      month: monthKeys,
      day: dayKeys,
      event: eventKeys,
    },
    timeKeysToRender: {
      year: yearKeysToRender,
      month: monthKeysToRender,
      day: dayKeysToRender,
      event: eventKeys,
    },
    timeMax: Math.max(yearMax, monthMax, dayMax),
    allTags,
  }
}

export function generateTimeLevel(timeline) {
  const { defaultMeasures: defaultTimeUnit, maxMeasures } = timeline
  const initialLevel = getLevelFromMeasure(defaultTimeUnit)
  const maxLevel = getLevelFromMeasure(maxMeasures)
  return { initialLevel, maxLevel }
}

export function calcNextLevelUnitKey(oldTimeUnitKey, newTimeUnitKeys, zoomIn) {
  let newUnitKey
  if (zoomIn) {
    // handle narrow down level change ex: 2023 -> 202301
    newUnitKey = newTimeUnitKeys.find((timeUnitKey) =>
      timeUnitKey.startsWith(oldTimeUnitKey)
    )
    if (!newUnitKey) {
      newUnitKey = newTimeUnitKeys.find(
        (timeUnitKey) =>
          Number(timeUnitKey.slice(0, oldTimeUnitKey.length)) >
          Number(oldTimeUnitKey)
      )
    }
  } else {
    // handle scale up level change ex: 202301 -> 2023
    const newTimeUnitKeyLength = newTimeUnitKeys[0].length
    newUnitKey = newTimeUnitKeys.find(
      (timeUnitKey) =>
        timeUnitKey === oldTimeUnitKey.slice(0, newTimeUnitKeyLength)
    )
  }
  return newUnitKey
}

export function generateDateString(timeUnitKey, measure) {
  if (timeUnitKey === 'empty') {
    return timeUnitKey
  }
  switch (measure) {
    case 'day':
      return timeUnitKey.slice(4, 8)

    case 'month':
      return Number(timeUnitKey.slice(4, 6)) + '月'

    case 'year':
    default:
      return timeUnitKey.slice(0, 4)
  }
}

/**
 * @param {Date} date
 * @returns {boolean}
 */
function isLastDayOfYear(date) {
  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + 1)
  return nextDay.getFullYear() !== date.getFullYear()
}

/**
 * @param {Date} date
 * @returns {boolean}
 */
function isFirstDayOfYear(date) {
  const lastDay = new Date(date)
  lastDay.setDate(lastDay.getDate() - 1)
  return lastDay.getFullYear() !== date.getFullYear()
}

/**
 * @param {Date} date
 * @returns {boolean}
 */
function isFirstMonthOfYear(date) {
  const lastMonth = new Date(date)
  lastMonth.setMonth(lastMonth.getMonth() - 1)
  return lastMonth.getFullYear() !== date.getFullYear()
}

/**
 * @param {Date} date
 * @returns {boolean}
 */
function isLastMonthOfYear(date) {
  const nextMonth = new Date(date)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  return nextMonth.getFullYear() !== nextMonth.getFullYear()
}

/**
 * Chcek if the unit (month or day) is the first or last of the year
 * @param {string} timeUnitKey
 * @param {'month'|'day'} measure
 */
export function isEdgeUnit(timeUnitKey, measure) {
  const date = convertTimeKeyToDate(timeUnitKey, measure)
  if (measure === 'month') {
    return isFirstMonthOfYear(date) || isLastMonthOfYear(date)
  } else if (measure === 'day') {
    return isFirstDayOfYear(date) || isLastDayOfYear(date)
  }
  console.error('function isEdgeUnit receive invalid measure', measure)
}
