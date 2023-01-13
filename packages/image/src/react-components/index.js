import React, { useEffect, useRef, useCallback } from 'react' // eslint-disable-line

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
   * Transform params `images` into an array, which included four step:
   * 1. use `Object.entries` to transform object to an array, each item is an another array which item is the key and value of certain property.
   *    For example, { original: 'original.png' ,w480: 'w480.png' } will transform into [["original", "original.png"], ["w480","w480.png"] ], this array is composed of two item, each item contain two child-item.
   * 2. Check each item of array and remove it under certain conditions:
   *    a. the first child-item (which is the key of certain property in params `images`) does not start with letter "w".
   *    b. the first child-item does not contain integers.
   *    c. the second child-item (which is the key of certain property in params `images`) is falsy values, e.g. empty string, undefined, null.
   *    As long as one of the conditions is met, will remove item.
   *    If the first child-item is "original", will not remove no matter what.
   *
   * 3. Sort array by the difference of first child-item. It will check the integer in first child-item, the smaller will be placed forward. If there is no integer in first child-item, it will be placed backward
   * 4. return an array without first child-item.
   *
   * In the end, if the params `images` is { 1600: '1600.png', original: 'original.png' ,w480: 'w480.png', w800: '', w1200: 'w1200.png' },
   * it will return ['w480.png', 'w1200.png', 'original.png']
   * @param {Object} images
   * @returns {String[]}
   */
  const transformImagesContent = (images) => {
    /** @type {[String,String][]} */
    const imagesWithoutEmptyProperty = Object.entries(images).filter(
      (pair) => (/^w\d+$/.test(pair[0]) && pair[1]) || pair[0] === 'original'
    )
    const sortedImagesList = imagesWithoutEmptyProperty.sort((pairA, pairB) => {
      // pair: [w800, image-w800.jpg], [original, image.jpg]
      const keyA = pairA[0]
      const keyB = pairB[0]
      const regex = /(\d+)/
      const matchedA = keyA.match(regex)
      const matchedB = keyB.match(regex)
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
    return sortedImagesList.map((item) => item[1])
  }

  const imagesList = transformImagesContent(images)

  /**
   * print log when `props.debugMode` is true
   * @param {String} message
   * @returns {void}
   */
  const printLogInDevMode = useCallback(
    (message) => {
      if (debugMode) {
        console.log(message)
      }
    },
    [debugMode]
  )
  /**
   * Loads an image and return the URL of image
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

  const loadImages = useCallback(
    /**
     * Loads a list of images in sequence
     * If previous promise is resolved, will end the promise chain, and return URL of image
     * If previous promise is rejected, will execute next promise
     * @param {String[]} imageUrls - The list of image URLs to load
     * @returns {Promise<String>} The URL of the image
     */
    (imageUrls) => {
      return imageUrls.reduce((prevPromise, url) => {
        return prevPromise.catch(() => loadImage(url))
      }, Promise.reject())
    },
    []
  )

  useEffect(() => {
    try {
      let callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImages(imagesList)
              .then((imageUrl) => {
                imageRef.current.src = imageUrl
                printLogInDevMode(
                  `Successfully Load image, current image source is ${imageUrl}`
                )
              })
              .catch(() => {
                printLogInDevMode(
                  'Unable to load any image , try to use default image as image src'
                )

                imageRef.current.src = defaultImage
                imageRef.current.addEventListener('error', () => {
                  printLogInDevMode('Unable to load default image')
                })
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
  }, [imagesList, loadImages, defaultImage, printLogInDevMode])

  return (
    <img
      style={imageStyle}
      ref={imageRef}
      src={loadingImage ? loadingImage : defaultImage}
      alt={alt}
    ></img>
  )
}
