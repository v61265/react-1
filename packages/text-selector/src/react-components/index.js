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
 *  @param {boolean} [shouldShiftLeft]
 */
export default function TextSelector({
  className,
  jsonUrls = [
    'https://v61265.github.io/demo-text-selector/test-01.json',
    'https://v61265.github.io/demo-text-selector/test-02.json',
  ],
  backgroundColor = '#000000',
  circleUrl = 'https://www.mirrormedia.mg/campaigns/tyreplus2022/hsuan_test.png',
  buttonBackground = 'https://www.mirrormedia.mg/campaigns/tyreplus2022/%E6%9C%AA%E5%91%BD%E5%90%8D%E7%9A%84%E4%BD%9C%E5%93%81%20%E6%8B%B7%E8%B2%9D2%202.png',
  circleUrlMobile = 'https://storage.googleapis.com/statics.mirrormedia.mg/campaigns/tyreplus2022/circle-mobile',
  buttonWording = '其他案例',
  shouldShiftLeft = true,
  isDebugMode = false,
  loadingImgSrc = 'https://unpkg.com/@readr-media/react-dropping-text@1.0.0/assets/loading.gif',
}) {
  const firstOrder = 0
  const { height, width } = useWindowSize()
  const allContainerRef = useRef(null)
  const nowHeightlightSpanRef = useRef(null)
  const itemStartRef = useRef(null)
  const listRef = useRef(null)
  const [data, setData] = useState([])
  const [heightlightIndex, setHeightlightIndex] = useState(0)
  const [leftOffset, setLeftOffset] = useState(0)
  const [translateToParagraph, setTranslateToParagraph] = useState(0)
  const [jsonFileIndex, setJsonFileIndex] = useState(0)
  const [isLoaded, setisLoaded] = useState(false)

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
    const datasWithoutorder = returnArr.map((item) => {
      return {
        ...item,
        order: -1,
      }
    })
    returnArr.unshift(...datasWithoutorder)
    returnArr.push(...datasWithoutorder)
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
        const { data: resData } = await axios.get(jsonUrls[jsonIndex])
        const isContinue = !isDebugMode
        const orderArray = Array.from(
          { length: jsonIndex ? resData.length : resData.length - 1 },
          (_, index) => {
            if (!jsonIndex) return index + 1
            if (!isContinue) return index
            return dataLength + index
          }
        )
        const newData = resData.map((item, index) => {
          // 第一筆 json 資料一定從第一個 object 開始跑
          if (index === firstOrder && !jsonIndex) {
            return {
              ...item,
              order: 0,
            }
          }
          const randomIndex = Math.floor(Math.random() * orderArray.length)
          const order = orderArray.splice(randomIndex, 1)[0]
          return {
            ...item,
            order,
          }
        })
        setData((prev) => {
          let newList = []
          if (isContinue) {
            newList = [...prev]
          }
          newList[jsonIndex] = newData
          return newList
        })
        setisLoaded(true)
      } catch (e) {
        console.log(e)
      }
    },
    [dataLength]
  )

  const handleOnClickBtn = () => {
    setHeightlightIndex((prev) => prev + 1)
    if (heightlightIndex > dataLength - 2) {
      setHeightlightIndex(1)
    }
  }

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
  }, [allContainerRef, isLoaded])

  useEffect(() => {
    if (!data[jsonFileIndex]) {
      fetchData(jsonFileIndex)
    }
    if (isDebugMode) {
      setHeightlightIndex(0)
    }
  }, [jsonFileIndex, isDebugMode])

  useEffect(() => {
    console.log({ dataLength, heightlightIndex })
    if (heightlightIndex >= dataLength - 3 && heightlightIndex) {
      setJsonFileIndex((prev) => prev + 1)
    }
  }, [dataLength, heightlightIndex])

  useEffect(() => {
    const element = itemStartRef.current
    if (typeof element?.getBoundingClientRect === 'function') {
      const rect = element.getBoundingClientRect()
      const leftOffset = rect?.x ?? rect?.left ?? 0
      setTranslateToParagraph(listRef.current.offsetLeft - leftOffset)
    }
  }, [heightlightIndex, data])

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
              heightlightIndex={heightlightIndex}
              setJsonFileIndex={setJsonFileIndex}
            />
          )}
          <CaseList
            ref={listRef}
            translateY={
              listRef.current?.offsetTop -
                nowHeightlightSpanRef.current?.offsetTop +
                height * (1 / 4) -
                itemStartRef.current?.clientHeight * 0.5 || -height * (1 / 3)
            }
          >
            {renderedData.map((dataItem, dataIndex) => {
              return (
                <span key={dataIndex}>
                  {dataItem.order === heightlightIndex ? (
                    <HeightlightWrapper
                      ref={nowHeightlightSpanRef}
                      className="nowItem"
                    >
                      <Anchor ref={itemStartRef} />
                      <HeightlightItem
                        dangerouslySetInnerHTML={{ __html: dataItem.content }}
                      />
                      <EmpasizedCircle
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
                    </HeightlightWrapper>
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
  poaition: relative;
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
  heigth: 100vh;
`

const GreyItem = styled.li`
  display: inline;
  color: #505050;
`

const HeightlightWrapper = styled.span`
  position: relative;
`

const EmpasizedCircle = styled.img`
  position: absolute;
  top: 0px;
  left: 0;
  background-size: 100% 100%;
  content: '';
  width: 100vw;
  max-width: 900px;
  height: calc(200% + 100px);
  transform: translate(${(props) => props.translateToParagraph}px, -30%);
  @media (min-width: 768px) {
    transform: translate(${(props) => props.translateToParagraph - 40}px, -30%);
  }
`

const HeightlightItem = styled.span``

const NextBtn = styled.button`
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 129px;
  height: 70px;
  dispaly: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 350;
  font-size: 14px;
  line-height: 180%;
  color: #ffffff;
  display: flex;
  justify-contnet: center;
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
