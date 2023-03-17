import { useState, useEffect } from 'react'
import events from 'events'

const managerName = '__readr_react_centralized_muted_manager'

/**
 *  `CentralizedMutedManager` is designed to let multiple
 *  React components on the same web page
 *  to communicate with each other via events.
 *
 *  Each component could publish/subscribe 'mutedChange' and
 *  'messageChange' event type.
 *
 *  Every subscriber would receive 'mutedChange' event, whose
 *  value would be `true` or `false` if any component calls
 *  manager's `updateMuted` function.
 *
 *  Every subscriber would receive 'messageChange' event, whose
 *  value is a string if any component calls manager's
 *  `updateMessage` function.
 */
export class CentralizedMutedManager {
  /** @type events.EventEmitter */
  eventEmitter = null
  muted = true
  message = ''

  /**
   *  @constructor
   *  @param {boolean} [muted=true]
   *  @param {string} [message='']
   */
  constructor(muted = true, message = '') {
    this.eventEmitter = new events.EventEmitter()
    this.muted = muted
    this.message = message
  }

  updateMuted(muted) {
    this.muted = muted
    this.onMutedChange()
  }

  updateNoticeMessage(message) {
    this.message = message
    this.onMessageChange()
  }

  onMutedChange() {
    this.eventEmitter.emit('mutedChange', this.muted)
  }

  onMessageChange() {
    this.eventEmitter.emit('messageChange', this.message)
  }

  addEventListener(eventType, cb) {
    this.eventEmitter.addListener(eventType, cb)
  }

  removeEventListener(eventType, cb) {
    this.eventEmitter.removeListener(eventType, cb)
  }

  getMuted() {
    return this.muted
  }

  getMessage() {
    return this.message
  }
}

/**
 *  Get the `CentralizedMutedManager` instance.
 *  @returns {CentralizedMutedManager|null}
 */
export function getCentralizedMutedManager() {
  if (typeof window !== 'undefined') {
    return window[managerName]
  }
  return null
}

/**
 * This hook is used to record the `muted` status in the whole web page.
 * It's useful when there are multiple components with audio/video element
 * in the same web page.
 * If the user has clicked web page centralized play/pause button,
 * we should mute/unmute all the rest audios/vidoeos as well on the same web page.
 *
 * @param {boolean} initialValue
 * @returns boolean
 */
export function useMuted(initialValue = true) {
  const [muted, _setMuted] = useState(initialValue)
  useEffect(() => {
    let manager = window?.[managerName]

    if (!manager) {
      manager = new CentralizedMutedManager(muted)
      window[managerName] = manager
    }

    // TODO: uncomment the following condition
    // after `CentralizedMutedManager` class moved into
    // independent subpkg.
    // if (manager instanceof CentralizedMutedManager) {
    if (
      typeof manager.addEventListener === 'function' &&
      typeof manager.removeEventListener === 'function'
    ) {
      const setMuted = (muted) => {
        _setMuted(muted)
      }
      manager.addEventListener('mutedChange', setMuted)

      setMuted(manager.getMuted())

      return () => {
        manager.removeEventListener('mutedChange', setMuted)
      }
    }
  }, [muted])

  return muted
}
