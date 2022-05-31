import React /* eslint-disable-line */, { useEffect, useRef } from 'react'
import styled from 'styled-components'

export const Block = styled.div`
  position: relative;
  /* styles for image link */
  img.img-responsive {
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    display: block;
  }
`

export const Caption = styled.div`
  line-height: 1.43;
  letter-spacing: 0.4px;
  font-size: 14px;
  color: #808080;
  padding: 15px 15px 0 15px;
`

export const EmbeddedCodeBlock = (entity) => {
  const { caption, embeddedCode } = entity.getData()
  const embedded = useRef(null)

  useEffect(() => {
    const node = embedded.current
    const fragment = document.createDocumentFragment()

    // `embeddedCode` is a string, which may includes
    // multiple '<script>' tags and other html tags.
    // For executing '<script>' tags on the browser,
    // we need to extract '<script>' tags from `embeddedCode` string first.
    //
    // The approach we have here is to create a temporary div element,
    // because div element is a DOM element,
    // we could use `querySelectorAll` method to query '<script>' elements,
    // and other non '<script>' elements.
    const div = document.createElement('div')
    div.innerHTML = embeddedCode
    const scripts = div.querySelectorAll('script')
    const nonScripts = div.querySelectorAll('div > :not(script)')

    nonScripts.forEach((ele) => {
      fragment.appendChild(ele)
    })

    scripts.forEach((s) => {
      const scriptEle = document.createElement('script')
      const attrNames = s.getAttributeNames()
      attrNames.forEach((a) => {
        scriptEle.setAttribute(a, s.getAttribute(a))
      })
      scriptEle.text = s.text || ''
      fragment.appendChild(scriptEle)
    })

    node.appendChild(fragment)
  }, [embeddedCode])

  return (
    <div>
      <Block ref={embedded} />
      {caption ? <Caption>{caption}</Caption> : null}
    </div>
  )
}
