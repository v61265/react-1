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
            display: flex;
            flex-wrap: nowrap;
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            overflow: hidden;
          }

          @media ${breakpoint.devices.tabletBelow} {
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
   *  @param {string} [props.bgColorTheme]
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
            background: ${
              props.theme?.table?.row?.backgroundColor[props?.bgColorTheme]
                ? props.theme?.table?.row?.backgroundColor[props?.bgColorTheme]
                : '#fff'
            }
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
    color: ${({ theme }) =>
      theme?.table?.candidate?.name?.color
        ? theme?.table?.candidate?.name?.color
        : '#000'};
    pointer-events: ${({ theme }) =>
      theme?.table?.candidate?.name?.isLink ? 'auto' : 'none'};
  }
  ${/**
   *  @param {Object} props
   *  @param {Object} props.theme
   *  @param {boolean} [props.multiLines]
   */
  (props) => {
    switch (props.theme?.device) {
      case 'mobile': {
        return `
          max-width: ${props.multiLines ? '187px' : 'none'};
          padding: 15px;
          text-align: left;
          line-height: 150%;
          height: ${props.multiLines ? 'none' : '53px'};
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
            height: ${props.multiLines ? 'none' : '56px'};

            border-left: 1px solid rgba(0, 0, 0, 0.1);
          }

          @media ${breakpoint.devices.tabletBelow} {
            height: ${props.multiLines ? 'none' : '53px'};
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
        const stickyCss = props.theme.stickyTopOffset
          ? `position: sticky; top: ${props.theme.stickyTopOffset}`
          : ''

        return `
          ${baseCss}
          @media ${breakpoint.devices.laptop} {
            display: table-header-group;
            border-bottom: 2px solid black;

            ${TCell} {
              border-bottom: 2px solid black;
            }

            ${stickyCss}
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
  ${/**
   *  @param {Object} props
   *  @param {boolean} props.multiLines
   */
  (props) => {
    return `
        display: ${props.multiLines ? 'flex' : 'inline-flex'};
      `
  }}
  align-items: center;

  > a {
    display: inline-flex;
    align-items: center;
  }

  span {
    margin-right: 8px;
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
  const tableRef = useRef(null)

  useEffect(() => {
    const node = tBodyRef.current

    // query the selected element according to district number
    const rowNode = node?.querySelector(`[data-row-id="${rowId}"]`)

    // get the number of pixels that the selected element's content is scrolled from its left edge
    const offsetLeft = rowNode?.offsetLeft ?? 0

    // scroll to the selected element
    node.scrollLeft = offsetLeft
  }, [scrollTo])

  useEffect(() => {
    // This effect hook is to set list row the same height.
    // For laptop version, the list is a `table`,
    // therefore, browser will automatically calculate the height and width for each row and column.
    // But, in mobile/tablet version, the list is built from `flex`, rather than `table`;
    // we need to adjust the list cell height and width if we want present multiple lines.
    // And the following codes does that.
    //
    // By the way, the reasons we don't render `table` for table/mobile version are:
    // 1. mobile/tablet mockups have vertical headers, but laptop has horizontal headers
    // 2. the mockups modified multiple times. At first, the cell does not support multiple lines.
    //    Therefore, `flex` is a easy way for implementation.
    // 3. if we want to change `flex` to `table`, we have to have two different code blocks to render
    //    mobile/tablet and laptop version.

    const node = tableRef.current

    // query table cell with multiple lines
    const multiLineCells = node?.querySelectorAll(`[data-multi-lines="true"]`)

    //mapping table: key is column id and value is maxHeight.
    //It is used to record which table cell having max height.
    let maxHeightMap = {}

    // calculate max height of table cells with the certain `data-column-id` attribute
    multiLineCells?.forEach((cell) => {
      const colId = cell?.getAttribute('data-column-id')
      if (!maxHeightMap.hasOwnProperty(colId)) {
        maxHeightMap[colId] = cell.offsetHeight
      } else if (maxHeightMap[colId] < cell?.offsetHeight) {
        maxHeightMap[colId] = cell.offsetHeight
      }
    })

    // set the cells, with the same `data-column-id`, the same height
    for (const colId in maxHeightMap) {
      const cells = node?.querySelectorAll(`[data-column-id="${colId}"]`)
      cells?.forEach((cell) => {
        cell.style.height = `${maxHeightMap[colId]}px`
      })
    }
  }, [dataManager])

  let previousBgColor = 'dark'
  const rowsJsx = rows.map((row, rowIdx) => {
    const cellsJsx = row.cells.map((cell, cellIdx) => {
      let multiLines = false
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
        multiLines = entity.multiLines ?? false
        return (
          <EntityCell multiLines={multiLines} key={entityIdx}>
            {entityJsx}
          </EntityCell>
        )
      })

      return (
        <TCell
          key={cellIdx}
          multiLines={multiLines}
          data-multi-lines={multiLines}
          data-column-id={cellIdx}
          style={{
            borderLeft: row.cells?.[cellIdx]?.[0]?.label === '' && 'none',
          }}
        >
          {entitiesJsx}
        </TCell>
      )
    })

    let currentBgColor = previousBgColor
    const previousRow = rows?.[rowIdx - 1]
    if (previousRow?.group !== row?.group) {
      currentBgColor = previousBgColor === 'dark' ? 'light' : 'dark'
      previousBgColor = currentBgColor
    }

    return (
      <TRow key={row.id} data-row-id={row.id} bgColorTheme={currentBgColor}>
        {cellsJsx}
      </TRow>
    )
  })

  return (
    <Table className={className} ref={tableRef}>
      <THead>
        <TRow bgColorTheme="light">
          {heads.map((head, idx) => {
            return (
              <TCell data-column-id={idx} key={`head_${idx}`}>
                {head}
              </TCell>
            )
          })}
        </TRow>
      </THead>
      <TBody ref={tBodyRef}>{rowsJsx}</TBody>
    </Table>
  )
}
