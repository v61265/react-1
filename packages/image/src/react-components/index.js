import React, { useEffect, useRef } from 'react' // eslint-disable-line

/**
 * @typedef {Object} Rwd
 * @property {string} [mobile]
 * @property {string} [tablet]
 * @property {string} [laptop]
 * @property {string} [desktop]
 * @property {string} [default]
 */
/**
 * @typedef {Object} Breakpoint
 * @property {string} [mobile]
 * @property {string} [tablet]
 * @property {string} [laptop]
 * @property {string} [desktop]
 */

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
 * @param {boolean} [props.priority]
 * - should preload image
 * @param {Boolean} [props.debugMode]
 * - can set if is in debug mode
 * - if `true`, then will print log after image loaded successfully of occur error.
 * - optional, default value is `false`.
 * @param {Breakpoint} [props.breakpoint]
 * - breakpoint of viewport width.
 * - optional, default value is `{ mobile: '767px', tablet: '1199px', laptop: '1439px', desktop: '2439px'}`
 * - For example, if we set breakpoint as `{ mobile: '767px', tablet: '1199px', laptop: '1439px', desktop: '2439px'}`,
 * - which means if viewport width is not greater then 767px, screen is mobile size, then we will get image sizes by comparing the value of `props.rwd`.
 * - It will affect which url of 'props.images' should loaded first.
 * @param {Rwd} [props.rwd]
 * - can set different sizes of image want to load first on different breakpoint of vw (viewport width),
 * such as {mobile: '300px', tablet: '400px', laptop: '800px', desktop: '1200px', default: '1600px'}.
 * - optional, default value is `{ mobile: '100vw', tablet: '100vw', laptop: '100vw', desktop: '100vw', default: '100vw'}`
 * - using `props.breakpoint` and `props.rwd`, you can decide different sizes of image is on each vw.
 * - if this param is default value, this sizes of images will equal to vw.
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
  priority = false,
  debugMode = false,
  rwd = {
    mobile: '100vw',
    tablet: '100vw',
    laptop: '100vw',
    desktop: '100vw',
    default: '100vw',
  },
  breakpoint = {
    mobile: '767px',
    tablet: '1199px',
    laptop: '1439px',
    desktop: '2439px',
  },
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
        return `${encodeURI(pair[1])} ${width}w`
      })
      .join(',')
    return str
  }

  /**
   * @param {string} sizes
   * @param {string} defaultValue
   * @returns {string}
   */
  const joinSizesWidthDefaultValue = (sizes, defaultValue) => {
    if (/max-width/.test(sizes)) {
      return [sizes, defaultValue].join(', ')
    } else {
      return defaultValue
    }
  }

  /**
   * @param {Object} rwd
   * @param {Object} breakpoint
   * @returns {string}
   */
  const transformImageSizes = (rwd, breakpoint) => {
    const defaultValue = '100vw'
    let sizesStr

    if (rwd && Object.entries(rwd).length) {
      const obj = {}

      Object.keys(rwd).forEach((key) => {
        if (breakpoint[key]) {
          obj[breakpoint[key]] = rwd[key]
        }
      })
      const sizes = Object.entries(obj)
        .map((pair) => `(max-width: ${pair[0]}) ${pair[1]}`)
        .join(', ')

      sizesStr = joinSizesWidthDefaultValue(
        sizes,
        rwd.default ? rwd.default : defaultValue
      )
    } else {
      sizesStr = defaultValue
    }

    printLogInDevMode(`Generated \`sizes\` info is \`${sizesStr}\``)
    return sizesStr
  }

  /**
   * Check which image should be load first, and return the resolution of image.
   * @param {[string, string][]} imagesList - The URL of the images to load
   * @returns {Promise<string>} - the resolution of image should be loaded
   */
  const getResolution = (imagesList) => {
    const imageSrcSet = transformImagesSrcSet(imagesList)
    const sizes = transformImageSizes(rwd, breakpoint)
    const originalSrc = images['original']
    return new Promise((resolve, reject) => {
      if (imageSrcSet) {
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
          } else if (index < imagesList.length - 1) {
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
      } else if (originalSrc) {
        resolve('original')
      } else {
        reject()
      }
    })
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
   * @param {[string,string][]} imagesList - The resolution determine which URL of image should loaded first.
   * @returns {Promise<string>} - The URL of the image should loaded
   */
  const loadImages = (resolution, imagesList) => {
    const index = imagesList.findIndex((pair) => pair[0] === resolution)
    const loadList = imagesList.slice(index)
    return loadList.reduce((prevPromise, pair) => {
      return prevPromise.catch(() => loadImage(pair[1]))
    }, Promise.reject())
  }
  /**
   * set url on <img> and remove css `filter` property after loaded
   * @param {string} url
   */
  const setImageUrl = (url) => {
    imageRef.current.src = url
    imageRef.current.style.filter = 'unset'
  }

  const loadImageProgress = () => {
    const imagesList = transformImagesContent(images)

    return getResolution(imagesList)
      .then((resolution) => {
        loadImages(resolution, imagesList)
          .then((url) => {
            setImageUrl(url)
            printLogInDevMode(
              `Successfully Load image, current image source is ${url}`
            )
          })
          .catch(() => {
            if (imageRef.current?.src) {
              setImageUrl(defaultImage)
              printLogInDevMode(
                'Unable to load any image, try to use default image as image src'
              )
              imageRef.current.addEventListener('error', () => {
                printLogInDevMode('Unable to load default image')
              })
            }
          })
      })
      .catch(() => {
        setImageUrl(defaultImage)
        printLogInDevMode(
          `Unable to get resolution on ${JSON.stringify(
            images
          )}, which means doesn't provide any url of image, try to use default image as image src`
        )
      })
  }

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImageProgress()
        observer.unobserve(entry.target)
      }
    })
  }

  useEffect(() => {
    try {
      let observer

      if (!priority) {
        observer = new IntersectionObserver(callback, {
          root: null,
          rootMargin: '0px',
          threshold: 0.25,
        })
        observer.observe(imageRef.current)
      } else {
        loadImageProgress()
      }

      return () => {
        if (observer) {
          observer.disconnect()
        }
      }
    } catch (err) {
      imageRef.current.style.visibility = 'hidden'
      console.error(`Unhandled error happened, hide image element', ${err}`)
    }
  }, [defaultImage, printLogInDevMode])

  return (
    <img
      className="readr-media-react-image"
      style={imageStyle}
      ref={imageRef}
      src={loadingImage ? loadingImage : defaultImage}
      alt={alt}
      rel={priority ? 'preload' : ''}
    ></img>
  )
}
