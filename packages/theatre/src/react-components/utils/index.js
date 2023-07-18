import { initialConfig } from '../constants/index.js'
import { types } from '@theatre/core'

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0
}

const getLocalStorageData = (name) => {
  const data = localStorage.getItem(name)
  if (data) {
    return data
  } else {
    return []
  }
}

const renderFontObject = (data = [], sheet) => {
  data
    .filter((item) => item.type === 'FONT')
    .forEach((item) => {
      const object = sheet.object(item.id, {
        ...initialConfig.FONT,
        content: types.string(`${item.content}`),
      })

      const element = document.getElementById(item.id)

      object.onValuesChange((newValue) => {
        element.style.cssText = `
          left: ${newValue.position.x}%;
          top: ${newValue.position.y}%;
          background: ${newValue.bgColor};
          color: ${newValue.font.color};
          opacity: ${newValue.opacity};
          padding: ${newValue.padding}px;
          display: ${newValue.visible ? 'block' : 'none'};
          width: ${newValue.size.width}px;
          font-size: ${newValue.font.size}px;
          border-radius: ${newValue.border.radius}px;
          border: ${newValue.border.size}px solid ${newValue.border.color};
          font-weight: ${newValue.font.weight};
          letter-spacing: ${newValue.font.spacing}px;
          line-height: ${newValue.lineHeight}px;
          text-align: ${newValue.textAlign};
          z-index: ${newValue.zIndex};
          transform: scale(${newValue.scale});
        `
      })
    })
}

const renderImageObject = (data = [], sheet) => {
  data
    .filter((item) => item.type === 'IMAGE')
    .forEach((item) => {
      const object = sheet.object(item.id, {
        ...initialConfig.IMAGE,
        url: types.string(`${item.url}`),
      })

      const element = document.getElementById(item.id)

      object.onValuesChange((newValue) => {
        element.style.cssText = `
          left: ${newValue.position.x}%;
          top: ${newValue.position.y}%;
          width: ${newValue.size.width}px;
          height: ${newValue.size.height}px;
          border-radius: ${newValue.border.radius}%;
          border: ${newValue.border.size}px solid ${newValue.border.color};
          background: ${newValue.bgColor};
          opacity: ${newValue.opacity};
          display: ${newValue.visible ? 'block' : 'none'};
          background-image = url(${newValue.url});
        `
      })
    })
}

export {
  isEmptyObject,
  getLocalStorageData,
  renderFontObject,
  renderImageObject,
}
