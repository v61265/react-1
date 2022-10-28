/**
 *  @typedef {import('./typedef').District} District
 *  @typedef {import('./typedef').Candidate} Candidate
 *  @typedef {import('./manager').Row} Row
 *  @typedef {import('./manager').Head} Head
 */

import React, { useEffect, useRef, useState } from 'react' // eslint-disable-line
import breakpoint from './breakpoint'
import styled from 'styled-components'

const Table = styled.div`
  display: table;
  font-weight: 500;
  color: #0f2d35;
  font-size: 16px;

  ${(props) => {
    switch (props.theme?.device) {
      case 'mobile': {
        return `
          width: 100%;
          height: 371px;
          display: flex;
          flex-wrap: nowrap;
          font-size: 14px;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          overflow: hidden;
        `
      }
      case 'rwd':
      default: {
        return `
          @media ${breakpoint.devices.laptop} {
            width: 1120px;
          }

          @media ${breakpoint.devices.laptopBelow} {
            width: 100%;
            height: 392px;
            display: flex;
            flex-wrap: nowrap;
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            overflow: hidden;
          }

          @media ${breakpoint.devices.tabletBelow} {
            height: 371px;
            font-size: 14px;
          }
        `
      }
    }
  }}
`

const TBody = styled.div`
  ${(props) => {
    switch (props.theme?.device) {
      case 'mobile': {
        return `
          position: relative;
          background-color: white;
          width: 100%;
          height: 367px;
          display: flex;
          flex-wrap: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
          scroll-behavior: smooth;
        `
      }
      case 'rwd':
      default: {
        return `
          @media ${breakpoint.devices.laptop} {
            display: table-row-group;
          }

          @media ${breakpoint.devices.laptopBelow} {
            /**
             * The reason we make \`TBody\` positioned is because we need it to
             * be an [\`offsetParent\`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
             * When user clicks go-to-specific-district button,
             * which will call \`setSelectedDistrictNumber\`,
             * and the program needs to automatically scroll to the specific district.
             * We need \`TBody\` to be positioned so that the district.\`offsetLeft\` will refer to
             * \`TBody\` rather than the viewport.
             **/
            position: relative;

            background-color: white;
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            overflow-x: scroll;
            overflow-y: hidden;
            scroll-behavior: smooth;
          }

          @media ${breakpoint.devices.tabletBelow} {
            height: 367px;
          }
        `
      }
    }
  }}
`

const TRow = styled.div`
  ${/**
   *  @param {Object} props
   *  @param {Object} [props.theme]
   *  @param {string} [props.backgroundColor]
   */
  (props) => {
    switch (props.theme?.device) {
      case 'mobile': {
        return `
          flex-shrink: 0;
        `
      }
      case 'rwd':
      default: {
        return `
          @media ${breakpoint.devices.laptop} {
            display: table-row;
            background-color: ${props.backgroundColor};
          }

          @media ${breakpoint.devices.laptopBelow} {
            flex-shrink: 0;
          }
        `
      }
    }
  }}
`

const TCell = styled.div`
  a {
    color: #d6610c;
    text-decoration: none;
  }
  ${(props) => {
    switch (props.theme?.device) {
      case 'mobile': {
        return `
          padding: 15px;
          text-align: left;
          line-height: 150%;
          height: 53px;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
          &:first-child {
            border-left: none;
          }
        `
      }
      case 'rwd':
      default: {
        return `
          @media ${breakpoint.devices.laptop} {
            padding: 8px 30px;
            &:first-child {
              border-bottom: none;
              padding-left: 4px;
            }
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            display: table-cell;
            vertical-align: middle;
          }

          @media ${breakpoint.devices.laptopBelow} {
            padding: 15px;
            text-align: left;
            line-height: 150%;
            height: 56px;

            border-left: 1px solid rgba(0, 0, 0, 0.1);
          }

          @media ${breakpoint.devices.tabletBelow} {
            height: 53px;
          }
        `
      }
    }
  }}
`

const THead = styled.div`
  ${(props) => {
    const baseCss = `
      background-color: ${props.theme.table.head.backgroundColor};
      color: ${props.theme.table.head.color};
    `
    const mobileCss = `
      border-right: 1px solid black;
      width: 96px;
      flex-shrink: 0;

      ${TRow} {
        flex-shrink: unset;
      }

      ${TCell} {
        text-align: right;
      }
    `
    switch (props.theme?.device) {
      case 'mobile': {
        return `
          ${baseCss}
          ${mobileCss}
        `
      }
      case 'rwd':
      default: {
        return `
          ${baseCss}
          @media ${breakpoint.devices.laptop} {
            display: table-header-group;
            border-bottom: 2px solid black;

            ${TCell} {
              border-bottom: 2px solid black;
            }
          }

          @media ${breakpoint.devices.laptopBelow} {
            ${mobileCss}
          }
        `
      }
    }
  }}
`

const EntityCell = styled.div`
  display: flex;
  align-items: center;

  > a {
    display: inline-flex;
    align-items: center;
  }
`

/**
 *  @param {Object} props
 *  @param {string} [props.className]
 *  @param {import('./manager').DataManager} props.dataManager
 *  @param {string} props.scrollTo
 */
export default function List({ className, dataManager, scrollTo }) {
  const rows = dataManager.buildListRows()
  const heads = dataManager.buildListHead()

  const rowId =
    dataManager.findRowByDistrictName(scrollTo)?.id ?? rows?.[0]?.id ?? 'row-1'
  const tBodyRef = useRef(null)
  useEffect(() => {
    const tBodyNode = tBodyRef.current

    // query the selected element according to district number
    const rowNode = tBodyNode?.querySelector(`[data-row-id="${rowId}"]`)

    // get the number of pixels that the selected element's content is scrolled from its left edge
    const offsetLeft = rowNode?.offsetLeft ?? 0

    // scroll to the selected element
    tBodyNode.scrollLeft = offsetLeft
  })

  const rowsJsx = rows.map((row, rowIdx) => {
    const cellsJsx = row.cells.map((cell, cellIdx) => {
      const entitiesJsx = cell.map((entity, entityIdx) => {
        const imgJsx = entity?.imgJsx ?? null
        const labelJsx = entity?.label ? <span>{entity.label}</span> : null
        const entityJsx = entity?.href ? (
          <a href={entity.href}>
            {imgJsx}
            {labelJsx}
          </a>
        ) : (
          <>
            {imgJsx}
            {labelJsx}
          </>
        )
        return <EntityCell key={entityIdx}>{entityJsx}</EntityCell>
      })

      return (
        <TCell
          key={cellIdx}
          style={{
            borderLeft: row.cells?.[cellIdx]?.[0].label === '' && 'none',
          }}
        >
          {entitiesJsx}
        </TCell>
      )
    })
    return (
      <TRow
        key={row.id}
        backgroundColor={rowIdx % 2 ? '#FFF1E8' : '#FFF8F3'}
        data-row-id={row.id}
      >
        {cellsJsx}
      </TRow>
    )
  })

  return (
    <Table className={className}>
      <THead>
        <TRow backgroundColor="#FFF8F3">
          {heads.map((head, idx) => {
            return <TCell key={`head_${idx}`}>{head}</TCell>
          })}
        </TRow>
      </THead>
      <TBody ref={tBodyRef}>{rowsJsx}</TBody>
    </Table>
  )
}
