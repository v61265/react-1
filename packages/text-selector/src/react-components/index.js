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
import Debugger from './components/debugger.js'

/**
 *  @param {Object} opts
 *  @param {string} [opts.className]
 *  @param {string[]} [opts.jsonUrls = ["https://editools-gcs.readr.tw/psycho/file_1.json","https://editools-gcs.readr.tw/psycho/file_2.json"]]
 *  @param {string} [opts.backgroundColor = '#000000']
 *  @param {string} [opts.circleUrl='https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/circle.png']
 *  @param {string} [opts.buttonBackground = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/button-background.png']
 *  @param {string} [opts.buttonWording = '其他案例']
 *  @param {string} [opts.circleUrlMobile = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/circle-mobile.png']
 *  @param {boolean} [props.isDebugMode = false]
 *  @param {string} [props.loadingImgSrc = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/loading.gif']
 */
export default function TextSelector({
  className,
  jsonUrls = [
    'https://editools-gcs.readr.tw/psycho/file_1.json',
    'https://editools-gcs.readr.tw/psycho/file_2.json',
  ],
  backgroundColor = '#000000',
  circleUrl = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/circle.png',
  buttonBackground = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/button-background.png',
  circleUrlMobile = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/circle-mobile.png',
  buttonWording = '其他案例',
  isDebugMode = false,
  loadingImgSrc = 'https://unpkg.com/@readr-media/text-selector@1.1.1-beta.1/assets/loading.gif',
}) {
  const firstOrder = 0
  const allContainerRef = useRef(null)
  const nowHighlightSpanRef = useRef(null)
  const itemStartRef = useRef(null)
  const listRef = useRef(null)
  const [data, setData] = useState([])
  const [highlightIndex, setHighlightIndex] = useState(-1)
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

  /**
   * @param {number} jsonIndex - 要抓取的 json index
   */
  const fetchData = useCallback(
    async (jsonIndex, debugModeCb) => {
      // data 的結構是 [[jsonUrls 中 index = 0 抓到的 data], [jsonUrls 中 index = 1 抓到的 data]...]
      // 如果 data[jsonIndex]，就表示該 json 的資料已經被抓過了，直接 return。
      // !jsonUrls[jsonIndex] 表示 jsonUuls 中並沒有那麼多檔案可以抓，直接 return。
      if (data[jsonIndex] || !jsonUrls[jsonIndex]) return

      try {
        const { data: resData } = await axios.get(jsonUrls[jsonIndex], {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })

        // 產生一個 array，包含這次 resData 會分配到的 order 值。
        // 0 這個值已經強制分給第一個檔案的第一筆資料，因此是從 1 ~ resData.length - 1，總長度是 resData.length - 1。
        // 不是第一個檔案的話，則是從 dataLength 開始跑，跑到 dataLength + resData.length。
        const orderArray = Array.from(
          { length: jsonIndex ? resData.length : resData.length - 1 },
          (_, index) => {
            if (!jsonIndex) return index + 1
            return dataLength + index
          }
        )

        /**
         * @typedef {Object} newDataItem
         * @property {string} content
         * @property {number} order
         */

        /**
         * @type {newDataItem[]}
         */
        const newData = resData.map((item, index) => {
          // 第一筆 json 資料一定從第一個 object 開始跑
          if (index === firstOrder && !jsonIndex) {
            return {
              content: item,
              order: 0,
            }
          }
          // 將 orderArray 的值隨機分給 resData 作為 order 值。
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
          return newList
        })
        setIsLoaded(true)
      } catch (e) {
        console.log(e)
      }
      if (isDebugMode) debugModeCb()
    },
    [dataLength]
  )

  const handleOnClickBtn = () => {
    if (highlightIndex > dataLength - 2) {
      setHighlightIndex(1)
    } else {
      setHighlightIndex((prev) => prev + 1)
    }
  }

  // // 跳轉至該 file order 最小的 item，debug mode 方便使用者檢查 file 格式
  const jumpToFileFirstOrder = (index) => {
    let length = 0
    for (let i = 0; i < index; i++) {
      length += data[i]?.length
    }
    setHighlightIndex(length ? length - 1 : 0)
  }

  const handleChangeFileIndex = (index) => {
    setJsonFileIndex(index)
    if (data[index]) {
      jumpToFileFirstOrder(index)
    } else {
      fetchData(index, () => {
        jumpToFileFirstOrder(index)
      })
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
      fetchData(jsonFileIndex, () => {})
    }
  }, [jsonFileIndex])

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
    <ScrollTrack backgroundColor={backgroundColor} isLoaded={isLoaded}>
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
              handleChangeFileIndex={handleChangeFileIndex}
            />
          )}
          <CaseList
            ref={listRef}
            translateY={
              listRef.current?.offsetTop -
              nowHighlightSpanRef.current?.offsetTop -
              nowHighlightSpanRef.current?.clientHeight * 0.5
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
                        className="desktop"
                        src={circleUrl}
                        translateToParagraph={translateToParagraph}
                      />
                      <HighlightCircle
                        className="mobile"
                        src={circleUrlMobile}
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
  font-family: inherit;
  font-style: normal;
  font-weight: 350;
  font-size: 14px;
  line-height: 180%;
  text-align: justify;
  color: #fff;
  transition: 1s;
  transform: translate(0, calc(${(props) => props.translateY}px + 20vh));
  height: 100vh;
`

const GreyItem = styled.li`
  display: inline;
  color: #505050;
`

const HighlightWrapper = styled.span`
  position: relative;
  .desktop {
    display: none;
  }
  @media screen and (min-width: 768px) {
    .desktop {
      display: block;
    }
    .mobile {
      display: none;
    }
  }
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
