import { useEffect, useState } from 'react'

/**
 * This hook is used to record the mute status in the whole web page.
 * It's useful when there are multiple `Full Screen Video`s in the same web page.
 * If the user has clicked mute button in one `Full Screen Video` component,
 * we should mute all the rest audios as well.
 *
 * @param {boolean} initialValue
 * @return {[boolean, Function]}
 */
export default function useMuted(initialValue = false) {
  const [muted, _setMuted] = useState(initialValue)
  useEffect(() => {
    const _muted = window?.['__readr_react_full_screen_video']?.muted
    if (typeof _muted === 'boolean') {
      _setMuted(_muted)
    }
  })
  const setMuted = (_muted) => {
    window['__readr_react_full_screen_video'] = {
      muted: _muted,
    }
    _setMuted(_muted)
  }

  return [muted, setMuted]
}
