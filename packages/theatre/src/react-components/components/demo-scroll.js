import { val, getProject } from '@theatre/core'
import React, { useState, useEffect, useRef } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import Stage from './stage.js'
import Dimmer from './dimmer-with-message.js'

const ScrollSizer = styled.div`
  position: relative;
  left: calc(50% - 50vw);
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  background: #ffffff;
`

const StickyBox = styled.div`
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
`

const defaultScrollScale = 1500

/**
 *  @param {Object} props
 *  @param {Object} props.animateJson
 *  @param {Array} props.objectJson
 *  @param {string} props.projectId
 */
export default function DemoScroll({
  animateJson = {},
  objectJson = [],
  projectId = '',
  isMobile = false,
}) {
  const projectState =
    Object.keys(animateJson).length > 0 ? { state: animateJson } : {}

  const project = getProject(`${projectId}`, projectState)
  const sheet = project.sheet('Scene', 'default')
  project.ready.then(() => sheet.sequence.pause())

  // --------------------------

  const [scrollPosition, setScrollPosition] = useState(0)

  const sequenceLength = val(sheet.sequence.pointer.length)
  const stageRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const stage = stageRef.current
      const sizer = stage.closest('.theatre-scroll-sizer')

      const stageRect = stage.getBoundingClientRect()
      const sizerRect = sizer.getBoundingClientRect()

      const distance = stageRect.top - sizerRect.top
      setScrollPosition(distance)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const newPosition =
      (scrollPosition / (sequenceLength * defaultScrollScale)) * sequenceLength
    sheet.sequence.position = newPosition
  }, [scrollPosition])

  // ----------------------------------------

  const [hasMediaError, setHasMediaError] = useState(false) // image & background && video onError
  const [loadedMedias, setLoadedMedias] = useState(0) // image & background onload
  const [isLoading, setIsLoading] = useState(true)

  const totalMedias = objectJson.filter(
    (data) => data.type === 'IMAGE' || data.type === 'BACKGROUND'
  ).length

  useEffect(() => {
    if (loadedMedias === totalMedias) {
      setIsLoading(false)
    }
  }, [loadedMedias, totalMedias, isMobile])

  const sizerHeight =
    hasMediaError || isLoading
      ? '100vh'
      : `${sequenceLength * defaultScrollScale}px`

  // ----------------------------------------

  useEffect(() => {
    setHasMediaError(false)
    setLoadedMedias(0)
  }, [isMobile, animateJson, objectJson])

  return (
    <ScrollSizer
      className="theatre-scroll-sizer"
      style={{ height: sizerHeight }}
    >
      <StickyBox ref={stageRef}>
        <Dimmer
          show={hasMediaError}
          message={'載入失敗。請檢查您的網路連線，並重新整理瀏覽器。'}
        />

        <Dimmer
          show={isLoading && !hasMediaError}
          message={'載入中'}
          shining={true}
        />

        <Stage
          objectJson={objectJson}
          sheet={sheet}
          setHasMediaError={setHasMediaError}
          setLoadedMedias={setLoadedMedias}
        />
      </StickyBox>
    </ScrollSizer>
  )
}
