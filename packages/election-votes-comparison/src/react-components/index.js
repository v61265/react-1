/**
 *  @typedef {import('./typedef').ElectionDistricts} ElectionDistricts
 */

import React, { useState } from 'react' // eslint-disable-line
import List from './list'
import Selector from './selector'
import breakpoint from './breakpoint'
import styled from 'styled-components'

const tabEnum = {
  all: 'all',
  plainIndigenous: 'plainIndigenous',
  mountainIndigenous: 'mountainIndigenous',
}

const StyledTab = styled.div`
  min-width: 120px;
  display: inline-block;
  cursor: pointer;
  font-weight: 700;
  color: ${/**
   *  @param {Object} props
   *  @param {boolean} props.active
   */
  (props) => (props.active ? '#D6610C' : 'rgba(14, 45, 53, 0.3)')};

  @media ${breakpoint.devices.tablet} {
    padding: 0 40px;
    font-size: 24px;
    line-height: 130%;
  }

  @media ${breakpoint.devices.tabletBelow} {
    padding: 0 12px;
    font-size: 16px;
    min-width: 80px;
  }
`

const StyledTabs = styled.div`
  text-align: center;
  margin-bottom: 48px;

  ${StyledTab}:first-child {
    border-right: 2px solid black;
  }

  ${StyledTab}:last-child {
    border-left: 2px solid black;
  }

  @media ${breakpoint.devices.mobileS} {
    margin-top: 28px;
  }

  @media ${breakpoint.devices.tablet} {
    margin-top: 38px;
  }

  @media ${breakpoint.devices.laptop} {
    margin-top: 48px;
  }
`

/**
 *  @callback OnTab
 *  @param {string} tab - value could be 'all', 'plainIndigenous' or 'mountainIndigenous'
 *  @returns {void}
 */

/**
 *  @param {Object} props
 *  @param {string} props.activeTab - value could be 'all', 'plainIndigenous' or 'mountainIndigenous'
 *  @param {OnTab} props.onTab
 *  @returns {React.ReactElement}
 */
function Tabs({ activeTab, onTab }) {
  return (
    <StyledTabs>
      <StyledTab
        active={activeTab === tabEnum.all}
        onClick={() => onTab(tabEnum.all)}
      >
        區域
      </StyledTab>
      <StyledTab
        active={activeTab === tabEnum.plainIndigenous}
        onClick={() => onTab(tabEnum.plainIndigenous)}
      >
        平地原住民
      </StyledTab>
      <StyledTab
        active={activeTab === tabEnum.mountainIndigenous}
        onClick={() => onTab(tabEnum.mountainIndigenous)}
      >
        山地原住民
      </StyledTab>
    </StyledTabs>
  )
}

const StyledSelector = styled(Selector)`
  margin: 40px auto 20px auto;

  @media ${breakpoint.devices.laptop} {
    display: none;
  }

  @media ${breakpoint.devices.laptopBelow} and ${breakpoint.devices.tablet} {
    width: 288px;
  }

  @media ${breakpoint.devices.tabletBelow} {
    width: 256px;
  }
`

const StyledList = styled(List)``

const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  background-color: #fff8f3;

  ${StyledList} {
    margin-left: auto;
    margin-right: auto;
  }
`

const Header = styled.header`
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  background-color: #f58439;
  margin-bottom: 48px;

  h3 {
    line-height: 120%;
    font-weight: 900;
    margin: 0;
    padding: 25px 105px;
  }

  h3:first-child {
    background-color: #f7ba31;
    color: #0f2d35;
  }

  h3:last-child {
    color: white;
  }

  @media ${breakpoint.devices.tablet} {
    h3 {
      display: inline-block;
      font-size: 32px;
    }
  }

  @media ${breakpoint.devices.tabletBelow} {
    h3 {
      font-size: 24px;
      display: block;
      text-align: center;
    }

    h3:last-child {
      border-top: 4px solid black;
    }
  }
`

/**
 *  @param {Object} props
 *  @param {string} [props.className]
 *  @param {number} props.year
 *  @param {string} props.title
 *  @param {ElectionDistricts} [props.districts=[]]
 *  @returns {React.ReactElement}
 */
export default function Root({
  className,
  districts: allDistricts = [],
  year,
  title,
}) {
  const [tab, setTab] = useState(tabEnum.all)
  const showTabs = allDistricts.find(
    (d) =>
      d.type === tabEnum.mountainIndigenous ||
      d.type === tabEnum.plainIndigenous
  )

  // pid means plainIndigenousDistricts
  const pid = allDistricts.filter((d) => d.type === tabEnum.plainIndigenous)

  // `mid` means mountainIndigenousDistricts
  const mid = allDistricts.filter((d) => d.type === tabEnum.mountainIndigenous)

  let tabsJsx = null
  let districts = []

  switch (tab) {
    case tabEnum.plainIndigenous: {
      districts = pid
      break
    }
    case tabEnum.mountainIndigenous: {
      districts = mid
      break
    }
    case tabEnum.all:
    default: {
      districts = allDistricts
      break
    }
  }

  tabsJsx = showTabs ? (
    <Tabs
      activeTab={tab}
      onTab={(t) => {
        setTab(t)
        switch (t) {
          case tabEnum.plainIndigenous: {
            setDistrictNumber(pid?.[0]?.number)
            break
          }
          case tabEnum.mountainIndigenous: {
            setDistrictNumber(mid?.[0]?.number)
            break
          }
          case tabEnum.all:
          default: {
            setDistrictNumber(allDistricts?.[0]?.number)
            break
          }
        }
      }}
    />
  ) : null

  /** @type {number[]} */
  const options = districts.map((d) => d.number)

  const [districtNumber, setDistrictNumber] = useState(options?.[0])

  return (
    <Container className={className}>
      <Header>
        <h3>{year}</h3>
        <h3>{title}</h3>
      </Header>
      {tabsJsx}
      <StyledSelector
        options={options}
        defaultValue={districtNumber}
        onSelect={(n) => setDistrictNumber(n)}
      />
      <StyledList districts={districts} scrollTo={districtNumber} />
    </Container>
  )
}
