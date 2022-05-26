import React from 'react'

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

function Link(props) {
  const { url } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <a href={url} style={{borderBottom: '2px solid #ebf02c', textDecoration: 'none', color: 'rgba(0,9,40,0.66)'}}>
      {props.children}
    </a>
  )
}

export const linkDecorator = {
  strategy: findLinkEntities,
  component: Link,
}
