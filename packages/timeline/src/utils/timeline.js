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
    tags: liveblog.tags,
    updatedAt: liveblog.updatedAt,
    timelineEvents: liveblog.liveblog_items,
  }
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
      return 4
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
  hour = day.length < 2 ? '0' + hour : hour
  let minute = '' + d.getMinutes()
  minute = minute.length < 2 ? '0' + minute : minute
  const yearKey = year
  const monthKey = year + month
  const dayKey = year + month + day
  const eventKey = year + month + day + hour + minute
  return { yearKey, monthKey, dayKey, eventKey }
}

function generateTimeUnitEvents(events) {
  const yearEvents = {}
  let yearKeys = new Set()
  const monthEvents = {}
  let monthKeys = new Set()
  const dayEvents = {}
  let dayKeys = new Set()
  let eventKeys = []

  events.forEach((event) => {
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
    eventKeys.push(eventKey)
  })

  yearKeys = Array.from(yearKeys)
  monthKeys = Array.from(monthKeys)
  dayKeys = Array.from(dayKeys)

  const yearMax = yearKeys.reduce((max, yearkey) => {
    const events = yearEvents[yearkey]
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
    timeMax: { year: yearMax, month: monthMax, day: dayMax, event: 0 },
  }
}

export function sortTimelineEvents(events, isAsc) {
  return events.sort((eventA, eventB) => {
    const d1 = new Date(eventA.publishTime)
    const d2 = new Date(eventB.publishTime)
    return isAsc ? d1 - d2 : d2 - d1
  })
}

export function generateTimelineData(timeline) {
  const isAsc = (timeline.sort = 'asc') // default to 'desc'
  const events = sortTimelineEvents(timeline.timelineEvents, isAsc)
  const { timeEvents, timeKeys, timeMax } = generateTimeUnitEvents(events)
  return { timeEvents, timeKeys, timeMax }
}

export function generateTimeLevel(timeline) {
  const { defaultMeasures: defaultTimeUnit, maxMeasures } = timeline
  const initialLevel = getLevelFromMeasure(defaultTimeUnit)
  const maxLevel = getLevelFromMeasure(maxMeasures)
  return { initialLevel, maxLevel }
}

export function calcNextLevelIndex(oldTimeUnitKey, newTimeUnitKeys, zoomIn) {
  let index = 0
  if (zoomIn) {
    // handle narrow down level change ex: 2023 -> 202301
    index = newTimeUnitKeys.findIndex((newTimeUnitKey) =>
      newTimeUnitKey.startsWith(oldTimeUnitKey)
    )
  } else {
    // handle scale up level change ex: 202301 -> 2023
    const newTimeUnitKeyLength = newTimeUnitKeys[0].length
    index = newTimeUnitKeys.findIndex(
      (newTimeUnitKey) =>
        newTimeUnitKey === oldTimeUnitKey.slice(0, newTimeUnitKeyLength)
    )
  }
  return index
}
