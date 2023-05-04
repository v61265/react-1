import React, { // eslint-disable-line
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState /* eslint-disable-line */,
} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import 'regenerator-runtime/runtime'
import useWindowSize from './hooks/useViewport'
import Debugger from './components/debugger.js'

/**
 *  @param {Object} opts
 *  @param {string} [opts.className]
 *  @param {string[]} [opts.jsonUrls]
 *  @param {string} [opts.backgroundColor]
 *  @param {string} [opts.circleUrl]
 *  @param {string} [opts.buttonBackground]
 *  @param {string} [opts.buttonWording]
 *  @param {string} [opts.circleUrlMobile]
 *  @param {boolean} [props.shouldShiftLeft]
 */
export default function TextSelector({
  className,
  jsonUrls = [
    'https://editools-gcs.readr.tw/psycho/file_1.json',
    'https://editools-gcs.readr.tw/psycho/file_2.json',
    'https://editools-gcs.readr.tw/psycho/file_3.json',
    'https://editools-gcs.readr.tw/psycho/file_4.json',
    'https://editools-gcs.readr.tw/psycho/file_5.json',
  ],
  backgroundColor = '#000000',
  circleUrl = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/circle.png',
  buttonBackground = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/button-background.png',
  circleUrlMobile = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/circle-mobile.png',
  buttonWording = '其他案例',
  shouldShiftLeft = true,
  isDebugMode = false,
  loadingImgSrc = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/loading.gif',
}) {
  const firstOrder = 0
  const { height, width } = useWindowSize()
  const allContainerRef = useRef(null)
  const nowHighlightSpanRef = useRef(null)
  const itemStartRef = useRef(null)
  const listRef = useRef(null)
  const [data, setData] = useState([])
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [leftOffset, setLeftOffset] = useState(0)
  const [translateToParagraph, setTranslateToParagraph] = useState(0)
  const [jsonFileIndex, setJsonFileIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const dataLength = useMemo(() => {
    let result = 0
    data.forEach((list) => {
      result += list.length
    })
    return result
  }, [data])

  const renderedData = useMemo(() => {
    const returnArr = []
    data.forEach((item) => {
      returnArr.push(...item)
    })
    const dataWithoutOrder = returnArr.map((item) => {
      return {
        ...item,
        order: -2,
      }
    })
    returnArr.unshift(...dataWithoutOrder)
    returnArr.push(...dataWithoutOrder)
    return returnArr
  }, [data])

  function removeHtmlTags(inputString) {
    const regex = /(<([^>]+)>)/gi
    return inputString?.replace(regex, '')
  }

  const fetchData = useCallback(
    async (jsonIndex) => {
      if (data[jsonIndex] || !jsonUrls[jsonIndex]) return
      try {
        const { data: resData } = await axios.get(jsonUrls[jsonIndex], {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        const orderArray = Array.from(
          { length: jsonIndex ? resData.length : resData.length - 1 },
          (_, index) => {
            if (!jsonIndex) return index + 1
            return dataLength + index
          }
        )
        const newData = resData.map((item, index) => {
          // 第一筆 json 資料一定從第一個 object 開始跑
          if (index === firstOrder && !jsonIndex) {
            return {
              content: item,
              order: 0,
            }
          }
          const randomIndex = Math.floor(Math.random() * orderArray.length)
          const order = orderArray.splice(randomIndex, 1)[0]
          return {
            content: item,
            order,
          }
        })
        setData((prev) => {
          let newList = [...prev]
          newList[jsonIndex] = newData
          // debug 模式中，直接跳到下個 json 檔 order 最小的
          if (isDebugMode && renderedData[0])
            setHighlightIndex(renderedData.length / 3 + 1)
          return newList
        })
        setIsLoaded(true)
      } catch (e) {
        console.log(e)
      }
    },
    [dataLength]
  )

  const handleOnClickBtn = () => {
    setHighlightIndex((prev) => prev + 1)
    if (highlightIndex > dataLength - 2) {
      setHighlightIndex(1)
    }
  }

  // mounted 後，才變動 highlightIndex
  useEffect(() => {
    setHighlightIndex(0)
  }, [])

  // 如果剩下兩個 item，則抓下一個檔案
  useEffect(() => {
    if (highlightIndex >= dataLength - 3 && highlightIndex && jsonFileIndex) {
      setJsonFileIndex(jsonFileIndex + 1)
    }
  }, [dataLength, highlightIndex])

  useEffect(() => {
    //  改變 jsonFileIndex 時，觸發 fetchData
    if (!data[jsonFileIndex]) {
      fetchData(jsonFileIndex)
    }
  }, [jsonFileIndex])

  // 取得整個 container 和左邊的距離
  useEffect(() => {
    if (shouldShiftLeft && isLoaded) {
      const shiftLeft = function() {
        const containerElement = allContainerRef?.current
        if (typeof containerElement?.getBoundingClientRect === 'function') {
          const rect = containerElement.getBoundingClientRect()
          const leftOffset = rect?.x ?? rect?.left ?? 0
          setLeftOffset(leftOffset)
        }
      }
      shiftLeft()
    }
  }, [shouldShiftLeft, isLoaded, jsonFileIndex])

  // 取得 highlight item 和 list 左邊的距離
  useEffect(() => {
    if (!isLoaded) return
    const element = itemStartRef.current
    const getTranslateToParagraph = () => {
      const rect = element.getBoundingClientRect()
      const itemLeftOffset = rect?.x ?? rect?.left ?? 0
      setTranslateToParagraph(listRef.current.offsetLeft - itemLeftOffset)
    }
    if (typeof element?.getBoundingClientRect === 'function') {
      window.requestAnimationFrame(getTranslateToParagraph)
    }
  }, [highlightIndex, isLoaded, jsonFileIndex])

  return (
    <ScrollTrack
      backgroundColor={backgroundColor}
      leftOffset={leftOffset}
      style={{ transform: `translateX(${0 - leftOffset}px)` }}
      isLoaded={isLoaded}
    >
      {!isLoaded && (
        <LoadingContainer>
          <Loading src={loadingImgSrc} />
        </LoadingContainer>
      )}
      {isLoaded && (
        <Container
          ref={allContainerRef}
          className={className}
          backgroundColor={backgroundColor}
        >
          {isDebugMode && (
            <Debugger
              jsonLength={jsonUrls.length}
              jsonFileIndex={jsonFileIndex}
              dataLength={dataLength}
              highlightIndex={highlightIndex}
              setJsonFileIndex={setJsonFileIndex}
            />
          )}
          <CaseList
            ref={listRef}
            translateY={
              listRef.current?.offsetTop -
                nowHighlightSpanRef.current?.offsetTop +
                height * (1 / 4) -
                nowHighlightSpanRef.current?.clientHeight * 0.5 ||
              -height * (1 / 3)
            }
          >
            {renderedData.map((dataItem, dataIndex) => {
              return (
                <span key={dataIndex}>
                  {dataItem.order === highlightIndex ? (
                    <HighlightWrapper
                      ref={nowHighlightSpanRef}
                      className="nowItem"
                    >
                      <Anchor ref={itemStartRef} />
                      <HighlightItem
                        dangerouslySetInnerHTML={{ __html: dataItem.content }}
                      />
                      <HighlightCircle
                        src={width >= 768 ? circleUrl : circleUrlMobile}
                        translateToParagraph={translateToParagraph}
                      />
                      <NextBtn
                        buttonBackground={buttonBackground}
                        translateToParagraph={translateToParagraph}
                        paraWidth={listRef.current?.offsetWidth}
                        onClick={handleOnClickBtn}
                      >
                        {buttonWording}
                      </NextBtn>
                    </HighlightWrapper>
                  ) : (
                    <GreyItem>{removeHtmlTags(dataItem.content)}</GreyItem>
                  )}
                </span>
              )
            })}
          </CaseList>
        </Container>
      )}
    </ScrollTrack>
  )
}

const ScrollTrack = styled.div`
  background: ${(props) => props.backgroundColor};
  position: relative;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 200vh;
  max-height: 200vh;
  ${({ isLoaded }) =>
    !isLoaded &&
    `
    min-width: 100%;
    max-width: 100%;
    display: flex;
  `}
`

const LoadingContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Loading = styled.img``

const Container = styled.div`
  position: sticky;
  top: 0;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 48px 0;
  border-bottom: 48px;
  z-index: 800;
  background: ${(props) => props.backgroundColor};
  ::before {
    content: '';
    width: 100vw;
    height: 48px;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    background: ${(props) => props.backgroundColor};
    z-index: 801;
  }
  ::after {
    content: '';
    width: 100vw;
    height: 48px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
    background: ${(props) => props.backgroundColor};
    z-index: 801;
  }
`

const CaseList = styled.ul`
  position: relative;
  width: calc(100vw - 40px);
  padding-inline-start: 20px;
  max-width: 712px;
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 350;
  font-size: 14px;
  line-height: 180%;
  text-align: justify;
  color: #fff;
  transition: 1s;
  transform: translate(0, ${(props) => props.translateY}px);
  height: 100vh;
`

const GreyItem = styled.li`
  display: inline;
  color: #505050;
`

const HighlightWrapper = styled.span`
  position: relative;
`

const HighlightCircle = styled.img`
  position: absolute;
  top: 0px;
  left: 0;
  background-size: 100% 100%;
  content: '';
  width: 100vw;
  max-width: 900px;
  height: calc(200% + 100px);
  transform: ${({ translateToParagraph }) =>
    `translate(${translateToParagraph - 40}px, -30%)`};
`

const HighlightItem = styled.span``

const NextBtn = styled.button`
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 129px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 350;
  font-size: 14px;
  line-height: 180%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.buttonBackground});
  border: 0;
  outline: 0;
  transform: translate(
    calc(
      ${(props) => props.translateToParagraph + props.paraWidth * 0.5}px - 50%
    ),
    100px
  );
  &:hover {
    cursor: pointer;
  }
`

const Anchor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
`
