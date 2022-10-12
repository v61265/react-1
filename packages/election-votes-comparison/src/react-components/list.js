/**
 *  @typedef {import('./typedef').ElectionDistricts} ElectionDistricts
 */

import React from 'react' // eslint-disable-line
import styled from 'styled-components'
import { AnonymousIcon, ElectedIcon } from './icons'

const Table = styled.div`
  display: table;

  font-size: 16px;
  font-weight: 500;
  color: #0f2d35;

  /* hd */
  width: 1120px;
`

const TBody = styled.div`
  display: table-row-group;
`

const TRow = styled.div`
  display: table-row;

  background-color: ${/**
   *  @param {Object} props
   *  @param {string} [props.backgroundColor]
   */
  (props) => props.backgroundColor};
`

const TCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding: 16px 30px;

  &:first-child {
    border-bottom: none;
  }

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  a {
    color: #d6610c;
    text-decoration: none;
  }
`

const THead = styled.div`
  display: table-header-group;
  border-bottom: 2px solid black;

  ${TCell} {
    border-bottom: 2px solid black;
  }
`

const NameCell = styled.div`
  display: flex;
  align-items: center;

  img,
  svg {
    margin-right: 8px;
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
