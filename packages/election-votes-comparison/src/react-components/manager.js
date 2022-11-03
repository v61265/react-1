import React, {useState} from 'react' // eslint-disable-line
import breakpoint from './breakpoint'
import styled from 'styled-components'
import { AnonymousIcon, ElectedIcon } from './icons'

/**
 *  @typedef {import('./typedef').Election} Election
 *  @typedef {import('./typedef').CouncilMemberElection} CouncilMemberElection
 *  @typedef {import('./typedef').Candidate} Candidate
 *  @typedef {import('./typedef').Entity} Entity
 */

/**
 *  @typedef {string} Head
 *
 *  @typedef {Object} CellEntity
 *  @property {string} [label]
 *  @property {string} [href]
 *  @property {React.ReactElement} [imgJsx]
 *
 *  @typedef {CellEntity[]} Cell - Table cell. A cell contains multiple entities
 *
 *  @typedef {Object} Row
 *  @property {string} id
 *  @property {Cell[]} cells
 *  @property {string} group
 */

const ImgBlock = styled.div`
  margin-right: 8px;
  img,
  svg {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }

  ${(props) => {
    switch (props.theme?.device) {
      case 'rwd':
      default: {
        return `
          @media ${breakpoint.devices.laptop} {
            img, svg {
              width: 40px;
              height: 40px;
            }
          }
        `
      }
    }
  }}
`

export class DataManager {
  /**
   *  @param {Object} data
   */
  constructor(data) {
    this.data = data
    this.rows = []
    this.head = []
  }

  /**
   *  @return {Object} data
   */
  getData() {
    return this.data
  }

  /**
   *  @returns {Head[]}
   */
  buildListHead() {
    console.warn('Method `buildListHead` needs to be implemented.')
    return this.head
  }

  /**
   *  @returns {Row[]}
   */
  buildListRows() {
    console.warn('Method `buildListRows` needs to be implemented.')
    return this.rows
  }

  /**
   *  @param {string} id
   *  @returns {Row}
   */
  getRowById(id) { // eslint-disable-line
    console.warn('Method `getRowById` needs to be implemented.')
    return {
      id: '',
      cells: [],
      group: '',
    }
  }

  /**
   *  @param {string} dn
   *  @returns {Row}
   */
  findRowByDistrictName(dn) { // eslint-disable-line
    console.warn('Method `findRowByValue` needs to be implemented.')
    return {
      id: '',
      cells: [],
      group: '',
    }
  }
}

function CandidateImg({ imgSrc }) {
  const [errored, setErrored] = useState(false)
  return (
    <ImgBlock>
      {imgSrc && !errored ? (
        <img src={imgSrc} onError={() => setErrored(true)} />
      ) : (
        <AnonymousIcon />
      )}
    </ImgBlock>
  )
}

export class CouncilMemberDataManager extends DataManager {
  /**
   *  @override
   *  @param {CouncilMemberElection} data
   */
  constructor(data) {
    super(data)
    this.districts = data?.districts || []
  }

  getData() {
    return this.data
  }

  /**
   *  @override
   *  @returns {Head[]}
   */
  buildListHead() {
    // built already, therefore return the built one
    if (this.head.length > 0) {
      return this.head
    }
    this.head = ['地區', '號次', '姓名', '推薦政黨', '得票數', '得票率', '當選']
    return this.head
  }

  /**
   *  @param {Entity[]} entities
   *  @returns {CellEntity[]}
   */
  buildNameCell(entities) {
    return entities?.map((entity) => {
      return {
        label: entity?.label,
        href: entity?.href,
        imgJsx: <CandidateImg imgSrc={entity?.imgSrc} />,
      }
    })
  }

  /**
   *  @param {Entity[]} entities
   *  @returns {CellEntity[]}
   */
  buildPartyCell(entities) {
    return entities?.map((entity) => {
      return {
        label: entity?.label || '無',
        href: entity?.href,
        imgJsx: entity?.imgSrc ? (
          <ImgBlock>
            <img src={entity.imgSrc} />
          </ImgBlock>
        ) : null,
      }
    })
  }

  /**
   *  @param {Candidate} c
   *  @returns {Cell[]}
   */
  buildRowFromCandidate(c) {
    return [
      // 號次
      [
        {
          label: `${c?.candNo ?? c?.number}`,
        },
      ],
      // 姓名
      this.buildNameCell([c?.name]),
      // 政黨
      this.buildPartyCell([c?.party]),
      // 得票數
      [
        {
          label: c?.tks?.toLocaleString() ?? c?.votes?.toLocaleString(),
        },
      ],
      // 得票率
      [
        {
          label: `${c?.tksRate ?? c?.voteRate}%`,
        },
      ],
      // 當選
      [
        {
          imgJsx: c?.candVictor || c?.elected ? <ElectedIcon /> : null,
        },
      ],
    ]
  }

  /**
   *  @param {string} dn
   *  @returns {string}
   */
  genFullDistrictName(dn) {
    return `第${dn}選舉區`
  }

  /**
   *  @override
   *  @returns {Row[]}
   */
  buildListRows() {
    // built already, therefore return the built one
    if (this.rows.length > 0) {
      return this.rows
    }

    this.districts?.forEach((d) => {
      d?.candidates?.forEach((c, cIdx) => {
        /** @type {Row} */
        const row = {
          id: '',
          cells: [],
          group: '',
        }

        row.group = d.districtName
        row.id = `${d.districtName}-${cIdx}`
        let districtName = ''
        if (cIdx === 0) {
          districtName =
            d.fullDistrictName || this.genFullDistrictName(d.districtName)
        }
        row.cells = this.buildRowFromCandidate(c)
        row.cells.unshift([{ label: districtName }])
        this.rows.push(row)
      })
    })
    return this.rows
  }

  /**
   *  @override
   *  @param {string} districtName
   *  @returns {Row}
   */
  findRowByDistrictName(districtName = '01') {
    return this.rows.find((r) => {
      return r.group === districtName
    })
  }
}

export class CountyMayorDataManager extends CouncilMemberDataManager {
  /**
   *  @override
   */
  genFullDistrictName(dn) {
    return dn
  }
}

export class LegislatorDataManager extends CouncilMemberDataManager {}

export function dataManagerFactory() {
  return {
    /**
     *  @param {Election} data
     *  @returns {DataManager}
     */
    newDataManager: (data) => {
      switch (data?.type) {
        case 'mayor':
          return new CountyMayorDataManager(data)
        case 'councilMember':
          return new CouncilMemberDataManager(data)
        case 'legislator':
          return new LegislatorDataManager(data)
        case 'president':
        default: {
          return new DataManager(data)
        }
      }
    },
  }
}
