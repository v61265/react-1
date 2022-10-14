/**
 *  @typedef {import('./typedef').ElectionDistricts} ElectionDistricts
 */

import React, { useEffect, useRef, useState } from 'react' // eslint-disable-line
import breakpoint from './breakpoint'
import styled from 'styled-components'
import { AnonymousIcon, ElectedIcon } from './icons'

const Table = styled.div`
  font-weight: 500;
  color: #0f2d35;
  font-size: 16px;

  @media ${breakpoint.devices.laptop} {
    display: table;
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

const TBody = styled.div`
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

const TRow = styled.div`
  @media ${breakpoint.devices.laptop} {
    display: table-row;
    background-color: ${/**
     *  @param {Object} props
     *  @param {string} [props.backgroundColor]
     */
    (props) => props.backgroundColor};
  }

  @media ${breakpoint.devices.laptopBelow} {
    flex-shrink: 0;
  }
`

const TCell = styled.div`
  a {
    color: #d6610c;
    text-decoration: none;
  }

  @media ${breakpoint.devices.laptop} {
    padding: 16px 30px;
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
  }

  @media ${breakpoint.devices.tabletBelow} {
    padding: 15px;
    height: 53px;
  }
`

const THead = styled.div`
  @media ${breakpoint.devices.laptop} {
    display: table-header-group;
    border-bottom: 2px solid black;

    ${TCell} {
      border-bottom: 2px solid black;
    }
  }

  @media ${breakpoint.devices.laptopBelow} {
    border-right: 1px solid black;
    width: 96px;
    flex-shrink: 0;

    ${TRow} {
      flex-shrink: unset;
    }

    ${TCell} {
      text-align: right;
    }
  }
`

const NameImgCell = styled.div`
  display: flex;
  align-items: center;

  img,
  svg {
    margin-right: 8px;
  }

  @media ${breakpoint.devices.laptop} {
    img,
    svg {
      width: 40px;
      height: 40px;
    }
  }

  @media ${breakpoint.devices.laptopBelow} {
    img,
    svg {
      width: 32px;
      height: 32px;
    }
  }
`

/**
 *  @param {Object} props
 *  @param {string} [props.className]
 *  @param {ElectionDistricts} [props.districts=[]]
 *  @param {number} [props.scrollTo] - district number. Only for tablet and mobile version.
 *  If provided, the program will automatically scroll to the district.
 *  @returns {React.ReactElement}
 */
export default function List({ className, districts = [], scrollTo }) {
  // dn means district number
  const dn = scrollTo ?? districts?.[0]?.number ?? 1
  const tBodyRef = useRef(null)

  useEffect(() => {
    const tBodyNode = tBodyRef.current

    // query the selected element according to district number
    const districtNode = tBodyNode?.querySelector(
      `[data-district-number="${dn}"]`
    )

    // get the number of pixels that the selected element's content is scrolled from its left edge
    const offsetLeft = districtNode?.offsetLeft ?? 0

    // scroll to the selected element
    tBodyNode.scrollLeft = offsetLeft
  })

  const districtsJsx = districts.map((d, dIdx) => {
    const candidates = d.candidates || []
    return candidates.map((c, cIdx) => {
      const imgJsx = c.name.imgSrc ? (
        <img src={c.name.imgSrc} />
      ) : (
        <AnonymousIcon />
      )
      const nameCellJsx = c.name.href ? (
        <a href={c.name.href}>
          <span>{c.name.label}</span>
        </a>
      ) : (
        <span>{c.name.label}</span>
      )
      const partyCellJsx = c.party.href ? (
        <a href={c.party.href}>
          <span>{c.party.label}</span>
        </a>
      ) : (
        <span>{c.party.label}</span>
      )
      const electedCellJsx = c.elected ? <ElectedIcon /> : ''
      return (
        <TRow
          backgroundColor={dIdx % 2 ? '#FFF1E8' : '#FFF8F3'}
          data-district-number={d.number}
        >
          <TCell>
            {cIdx === 0
              ? `第${d.number < 10 ? `0${d.number}` : d.number}選舉區`
              : ''}
          </TCell>
          <TCell>{c.number}</TCell>
          <TCell>
            <NameImgCell>
              {imgJsx}
              {nameCellJsx}
            </NameImgCell>
          </TCell>
          <TCell>{partyCellJsx}</TCell>
          <TCell>{c.votes && c.votes.toLocaleString()}</TCell>
          <TCell>{c.voteRate}%</TCell>
          <TCell>{electedCellJsx}</TCell>
        </TRow>
      )
    })
  })
  return (
    <Table className={className}>
      <THead>
        <TRow backgroundColor="#FFF8F3">
          <TCell>地區</TCell>
          <TCell>號次</TCell>
          <TCell>姓名</TCell>
          <TCell>推薦政黨</TCell>
          <TCell>得票數</TCell>
          <TCell>得票率</TCell>
          <TCell>當選</TCell>
        </TRow>
      </THead>
      <TBody ref={tBodyRef}>{districtsJsx}</TBody>
    </Table>
  )
}
