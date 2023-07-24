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

  yearKeys = yearKeys.reduce((newYearKeys, yearKey) => {
    if (newYearKeys.length === 0) {
      newYearKeys.push(yearKey)
    } else {
      const preYearKey = newYearKeys[newYearKeys.length - 1]
      const year = yearKey.slice(0, 4)
      // const month = yearKey.slice(4)
      const d = new Date(year)
      const preYear = preYearKey.slice(0, 4)
      // const preMonth = previousYearKey.slice(4)
      const preD = new Date(preYear)
      d.setFullYear(d.getFullYear() - 1)
      if (d.getFullYear() !== preD.getFullYear()) {
        // console.log(
        //   `newYearKey ${yearKey} not continue to preYearKey ${preYearKey}`
        // )
        newYearKeys.push('empty')
      }
      newYearKeys.push(yearKey)
    }
    return newYearKeys
  }, [])
  monthKeys = monthKeys.reduce((newMonthKeys, monthKey) => {
    if (newMonthKeys.length === 0) {
      newMonthKeys.push(monthKey)
    } else {
      const preMonthKey = newMonthKeys[newMonthKeys.length - 1]
      const year = monthKey.slice(0, 4)
      const month = monthKey.slice(4)
      const d = new Date(year, month - 1)
      const preYear = preMonthKey.slice(0, 4)
      const preMonth = preMonthKey.slice(4)
      const preD = new Date(preYear, preMonth - 1)
      d.setMonth(d.getMonth() - 1)
      if (
        d.getFullYear() + '' + (d.getMonth() + 1) !==
        preD.getFullYear() + '' + (preD.getMonth() + 1)
      ) {
        // console.log(
        //   `newMonthKey ${monthKey} not continue to preMonthKey ${preMonthKey}`
        // )
        newMonthKeys.push('empty')
      }
      newMonthKeys.push(monthKey)
    }
    return newMonthKeys
  }, [])
  dayKeys = dayKeys.reduce((newDayKeys, dayKey) => {
    if (newDayKeys.length === 0) {
      newDayKeys.push(dayKey)
    } else {
      const preDayKey = newDayKeys[newDayKeys.length - 1]
      const year = dayKey.slice(0, 4)
      const month = dayKey.slice(4, 6)
      const day = dayKey.slice(6)
      const d = new Date(year, month - 1, day)
      const preYear = preDayKey.slice(0, 4)
      const preMonth = preDayKey.slice(4, 6)
      const preDay = preDayKey.slice(6)
      const preD = new Date(preYear, preMonth - 1, preDay)
      d.setDate(d.getDate() - 1)
      if (
        '' + d.getFullYear() + (d.getMonth() + 1) + d.getDate() !==
        '' + preD.getFullYear() + (preD.getMonth() + 1) + preD.getDate()
      ) {
        // console.log(
        //   `newDayKey ${dayKey} not continue to preDayKey ${preDayKey}`
        // )
        newDayKeys.push('empty')
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
      return timeUnitKey.slice(4, 6) - 0 + '月'

    case 'year':
    default:
      return timeUnitKey.slice(0, 4)
  }
}
