/**
 *  @typedef {import('./typedef').ElectionDistricts} ElectionDistricts
 */

import React from 'react' // eslint-disable-line
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
    background-color: white;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
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
    padding: 16px 20px;
    text-align: left;
    line-height: 150%;
    height: 56px;
  }

  @media ${breakpoint.devices.tabletBelow} {
    padding: 16px;
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

const NameCell = styled.div`
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
 */
export default function List({ className, districts = [] }) {
  const districtsJsx = districts.map((d, dIdx) => {
    const candidates = d.candidates
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
      const partyCellJsx = c.party?.href ? (
        <a href={c.party.href}>
          <span>{c.party.label}</span>
        </a>
      ) : (
        <span>{c.party.label}</span>
      )
      const electedCellJsx = c.elected ? <ElectedIcon /> : ''
      return (
        <TRow backgroundColor={dIdx % 2 ? '#FFF1E8' : '#FFF8F3'}>
          <TCell>
            {cIdx === 0
              ? `第${d.number < 10 ? `0${d.number}` : d.number}選舉區`
              : ''}
          </TCell>
          <TCell>{c.number}</TCell>
          <TCell>
            <NameCell>
              {imgJsx}
              {nameCellJsx}
            </NameCell>
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
      <TBody>{districtsJsx}</TBody>
    </Table>
  )
}
