import { getProject } from '@theatre/core'
import Stage from './stage.js'
import Dimmer from './dimmer-with-message.js'
import { useState, useEffect } from 'react' // eslint-disable-line
import styled from '../../styled-components.js'

const VideoWrapper = styled.div`
  position: relative;
  left: calc(50% - 50vw);
  width: 100vw;
`

/**
 *  @param {Object} props
 *  @param {Object} props.animateJson
 *  @param {Array} props.objectJson
 *  @param {string} props.projectId
 */
export default function DemoVideo({
  animateJson = {},
  objectJson = [],
  projectId = '',
  isMobile = false,
}) {
  const projectState =
    Object.keys(animateJson).length > 0 ? { state: animateJson } : {}
  const project = getProject(`${projectId}`, projectState)

  const sheet = project.sheet('Scene', 'default')
  project.ready.then(() => sheet.sequence.play())

  // --------------------------

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

  // ----------------------------------------

  useEffect(() => {
    setHasMediaError(false)
    setLoadedMedias(0)
    setIsLoading(true)
  }, [isMobile, animateJson, objectJson])

  return (
    <VideoWrapper>
      <Dimmer
        show={isLoading && !hasMediaError}
        message={'載入中'}
        shining={true}
      />
      <Dimmer
        show={hasMediaError}
        message={'載入失敗。請檢查您的網路連線，並重新整理瀏覽器。'}
      />

      <Stage
        objectJson={objectJson}
        sheet={sheet}
        setHasMediaError={setHasMediaError}
        setLoadedMedias={setLoadedMedias}
      />
    </VideoWrapper>
  )
}
