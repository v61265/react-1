import React/* eslint-disable-line */, { useEffect, useRef, useState } from 'react'
import mockups from './mockups'
import styled from 'styled-components'

/**
 *  @param {Object} opts
 *  @param {import('./typedef').Styles} [opts.styles]
 *  @param {string[]} opts.audioUrls,
 *  @param {string} [opts.className]
 *  @param {string} [opts.preload='auto'] - 'auto', 'none' or 'metadata'. `preload` attribute of `audio` tag.
 *  @param {string[]} opts.textArr - quote text
 */
export default function AudioQuoteShadow({
  audioUrls,
  className,
  preload,
  styles,
  textArr,
}) {
  // TODO implement AudioQuoteShadow
  return (
    <div>AudioQuoteShadowe</div>
  )
}

