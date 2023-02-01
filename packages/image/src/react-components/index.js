import React, { useEffect, useRef } from 'react' // eslint-disable-line

/**
 * Check an String contain integer, for example, 'w1200' is valid, 'original' or 'randomName' is not valid
 */
const REGEX = /(\d+)/
/**
 *
 * @param {Object} props
 * @param {Object} props.images
 * - list of URL of images want to loaded.
 * - required.
 * @param {String} [props.loadingImage]
 * - placeholder when loading image, it will show when item of `images` is not loaded.
 * - optional, default value is `""`.
 * @param {String} [props.defaultImage]
 * - default image, it will show if all items of `images` can not be loaded, and would become loading animation if `loadingImage` is not passed in.
 * - optional, default value is `""`.
 * @param {String} [props.alt]
 * - image alt.
 * - optional, default value is `""`.
 * @param {"fill"|"contain"|"cover"|"scale-down"|"none"|"initial"|"inherit"} [props.objectFit] - image CSS property. Optional, default value is `"cover"`.
 * @param {String | Number} [props.width]
 * - image width.
 * - optional, default value is `"100%"`.
 * @param {String | Number} [props.height]
 * - image height.
 * - optional, default value is `"100%"`.
 * @param {Boolean} [props.debugMode]
 * - can set if is in debug mode
 * - if `true`, then will print log after image loaded successfully of occur error.
 * - optional, default value is `false`.
 * @param {'auto' | 'manual'} [props.loadMode]
 * - Load images in different mode:
 * - If `'auto'`, it will automatically load the most suitable picture according to the screen width.
 * - If `'manual'`, it will load the corresponding picture according to the specified `loadResolution`.
 * - Optional, default value is `'auto'`
 * @param {string} [props.loadResolution]
 * - which size of image should load first.
 * - Only effective if `props.loadMode` is `'manual'`
 * - Optional, default value is `original`
 * @returns {JSX.Element}
 */
export default function CustomImage({
  images = { original: '' },
  loadingImage = '',
  defaultImage = '',
  alt = '',
  objectFit = 'cover',
  width = '100%',
  height = '100%',
  debugMode = false,
  loadMode = 'auto',
  loadResolution = 'original',
}) {
  const imageRef = useRef(null)
  /**
   * custom image style
   *
   */
  const imageStyle = {
    objectFit,
    width,
    height,
    filter: loadingImage ? 'unset' : 'blur(8px)',
  }

  /**
   * Transform params `images` into an array, which included three step:
   * 1. use `Object.entries` to transform object to an array, each item is an another array which item is the key and value of certain property.
   *    For example, { original: 'original.png' ,w480: 'w480.png' } will transform into [["original", "original.png"], ["w480","w480.png"] ], this array is composed of two item, each item contain two child-item.
   * 2. Check each item of array and remove it under certain conditions:
   *    a. the first child-item (which is the key of certain property in params `images`) does not start with letter "w".
   *    b. the first child-item does not contain integers.
   *    c. the second child-item (which is the key of certain property in params `images`) is falsy values, e.g. empty string, undefined, null.
   *    As long as one of the conditions is met, will remove item.
   *    If the first child-item is "original", will not remove no matter what.
   * 3. Sort array by the difference of first child-item. It will check the integer in first child-item, the smaller will be placed forward. If there is no integer in first child-item, it will be placed backward.
   * In the end, if the params `images` is { 1600: '1600.png', original: 'original.png' ,w480: 'w480.png', w800: '', w1200: 'w1200.png' },
   * it will return [ ['w480': 'w480.png'], ['w1200': 'w1200.png'], 'original': 'original.png']
   * @param {Object} images
   * @returns {[string, string][]}
   */
  const transformImagesContent = (images) => {
    /** @type {[string,string][]} */
    const imagesWithoutEmptyProperty = Object.entries(images).filter(
      (pair) => (/^w\d+$/.test(pair[0]) && pair[1]) || pair[0] === 'original'
    )
    const sortedImagesList = imagesWithoutEmptyProperty.sort((pairA, pairB) => {
      // pair: [w800, image-w800.jpg], [original, image.jpg]
      const keyA = pairA[0]
      const keyB = pairB[0]
      const matchedA = keyA.match(REGEX)
      const matchedB = keyB.match(REGEX)
      if (matchedA && matchedB) {
        // match: [800]
        const sizeA = Number(matchedA[0])
        const sizeB = Number(matchedB[0])
        return sizeA - sizeB
      } else if (matchedA) {
        return -1
      } else {
        return 1
      }
    })
    return sortedImagesList
  }

  /**
   * Transform list of images into string for attribute 'srcset' of <img>.
   * @param {[string, string][]} imagesList - list of images
   */
  const transformImagesSrcSet = (imagesList) => {
    const str = imagesList
      .filter((pair) => pair[0] !== 'original')
      .map((pair) => {
        const width = pair[0].match(REGEX)[0]
        return `${pair[1]} ${width}w`
      })
      .join(',')
    const defaultSrc = imagesList
      .filter((pair) => pair[0] === 'original')
      .map((pair) => `${pair[1]}`)
    return `${str}, ${defaultSrc}`
  }

  const imagesList = transformImagesContent(images)
  const imageSrcSet = transformImagesSrcSet(imagesList)

  /**
   * Print log when `props.debugMode` is true
   * @param {String} message
   * @returns {void}
   */
  const printLogInDevMode = (message) => {
    if (debugMode) {
      console.log(message)
    }
  }

  /**
   * Check which image should be load first, and return the resolution of image.
   * This function will act differently according to value of `loadMode`:
   *
   * 1. `loadMode` is "auto":
   *    - This function check which url of image should be loaded according to the screen width.
   *    - If loaded successfully, then return the resolution of image, such as 'w480', 'w800', 'original'.
   *    - If not, then return the resolution of image with larger size.
   * 2. `loadMode` is "manual":
   *    - If `loadResolution` is not falsy and existed in item of `imagesList`, will return `loadResolution`.
   *    - If `loadResolution` is falsy or not existed in item of `imagesList`, will return the smallest resolution in `imagesList`.
   * @param {[string, string][]} imagesList - The URL of the images to load
   * @returns {Promise<string>} - the resolution of image should be loaded
   */
  const getResolution = (imagesList) => {
    const imagesWidthList = imagesList
      .filter((pair) => pair[0] !== 'original')
      .map((pair) => {
        const width = pair[0].match(REGEX)[0]
        return Number(width)
      })
    switch (loadMode) {
      case 'auto':
        const sizes = imagesWidthList
          .map((width) => `(max-width: ${width}px) ${width}px`)
          .join(', ')
        return new Promise((resolve, reject) => {
          const img = new Image()
          /**
           * @param {Event & { target: HTMLImageElement }} event
           */
          const eventHandler = (event) => {
            const eventType = event.type
            const imageSrc = event.target?.currentSrc
            const index = imagesList.findIndex((p) => p[1] === imageSrc)
            if (index === -1) {
              reject()
            } else if (index < imagesList.length) {
              switch (eventType) {
                case 'load':
                  resolve(imagesList[index][0])
                  break
                case 'error':
                  resolve(imagesList[index + 1][0])
              }
            } else {
              resolve(imagesList[imagesList.length - 1][0])
            }

            img.removeEventListener('load', eventHandler)
            img.removeEventListener('error', eventHandler)
          }

          img.addEventListener('load', eventHandler)
          img.addEventListener('error', eventHandler)
          img.sizes = sizes
          img.srcset = imageSrcSet
        })

      case 'manual':
        return new Promise((resolve) => {
          //loadResolution is not existed,
          //not an integer with letter 'w' start,
          //is 'original', then return the biggest sizes in imagesList.
          if (
            !loadResolution ||
            !loadResolution.match(REGEX) ||
            loadResolution === 'original'
          ) {
            resolve(imagesList[imagesList.length - 1][0])
          } else {
            const width = Number(loadResolution.match(REGEX)[0])

            /**
             *
             * @param {number[]} arr
             * @param {number} num
             * @returns {number}
             */
            const getClosestNumber = (arr, num) => {
              let closest = arr[0]

              arr.some((val, i) => {
                if (val === num) {
                  closest = val
                } else if (
                  i < arr.length - 1 &&
                  num > val &&
                  num < arr[i + 1]
                ) {
                  closest = arr[i + 1]
                } else if (i === arr.length - 1 && num > val) {
                  closest = undefined
                }
              })
              return closest
            }
            const closestNumber = getClosestNumber(imagesWidthList, width)
            if (closestNumber) {
              resolve(`w${closestNumber}`)
            } else {
              resolve(imagesList[imagesList.length - 1][0])
            }
          }
        })
    }
  }

  /**
   * Load an image and return the URL of image
   * @param {String} url - The URL of the image to load
   * @returns {Promise<String>} - The URL of the image
   */
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()

      const loadHandler = () => {
        resolve(url)
        img.removeEventListener('load', loadHandler)
      }
      const errorHandler = () => {
        reject()
        img.removeEventListener('error', errorHandler)
      }

      img.addEventListener('load', loadHandler)
      img.addEventListener('error', errorHandler)
      img.src = url
    })
  }

  /**
   * Loads a list of images in sequence, it will start loading on certain resolution.
   * If previous promise is resolved, will end the promise chain, and return URL of image which successfully loaded.
   * If previous promise is rejected, will execute next promise
   * @param {string} resolution - The resolution determine which URL of image should loaded first.
   * @returns {Promise<string>} - The URL of the image should loaded
   */
  const loadImages = (resolution) => {
    const index = imagesList.findIndex((pair) => pair[0] === resolution)
    const loadList = imagesList.slice(index)
    return loadList.reduce((prevPromise, pair) => {
      return prevPromise.catch(() => loadImage(pair[1]))
    }, Promise.reject())
  }

  useEffect(() => {
    try {
      let callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            getResolution(imagesList)
              .then((resolution) => {
                loadImages(resolution)
                  .then((url) => {
                    imageRef.current.src = url
                    printLogInDevMode(
                      `Successfully Load image, current image source is ${url}`
                    )
                  })
                  .catch(() => {
                    imageRef.current.src = defaultImage
                    printLogInDevMode(
                      'Unable to load any image, try to use default image as image src'
                    )
                    imageRef.current.addEventListener('error', () => {
                      printLogInDevMode('Unable to load default image')
                    })
                  })
              })
              .catch(() => {
                imageRef.current.src = defaultImage
                printLogInDevMode(
                  'Unable to get resolution, try to use default image as image src'
                )
              })

            imageRef.current.style.filter = 'unset'
            observer.unobserve(entry.target)
          }
        })
      }
      const observer = new IntersectionObserver(callback, {
        root: null,
        rootMargin: '0px',
        threshold: 0.25,
      })
      observer.observe(imageRef.current)

      return () => {
        observer.disconnect()
      }
    } catch (err) {
      imageRef.current.style.visibility = 'hidden'
      console.error(`Unhandled error happened, hide image element', ${err}`)
    }
  }, [imagesList, defaultImage, printLogInDevMode])

  return (
    <img
      style={imageStyle}
      ref={imageRef}
      src={loadingImage ? loadingImage : defaultImage}
      alt={alt}
    ></img>
  )
}
