/**
 *  @typedef {import('./typedef').ElectionDistricts} ElectionDistricts
 */

import React, { useState } from 'react' // eslint-disable-line
import List from './list'
import styled from 'styled-components'

const tabs = {
  district: 'district',
  plainIndigenous: 'plainIndigenous',
  mountainIndigenous: 'mountainIndigenous',
}

const StyledTab = styled.div`
  display: inline-block;
  min-width: 120px;
  padding: 0 40px;
  cursor: pointer;
  font-weight: 700;
  font-size: 24px;
  line-height: 130%;
  color: ${/**
   *  @param {Object} props
   *  @param {boolean} props.isSelected
   */
  (props) => (props.isSelected ? '#D6610C' : 'rgba(14, 45, 53, 0.3)')};
`

const StyledTabs = styled.div`
  text-align: center;
  margin-top: 48px;
  margin-bottom: 48px;

  ${StyledTab}:first-child {
    border-right: 2px solid black;
  }

  ${StyledTab}:last-child {
    border-left: 2px solid black;
  }
`

function Tabs({ selected, onTab }) {
  return (
    <StyledTabs>
      <StyledTab
        isSelected={selected === tabs.district}
        onClick={() => onTab(tabs.district)}
      >
        區域
      </StyledTab>
      <StyledTab
        isSelected={selected === tabs.plainIndigenous}
        onClick={() => onTab(tabs.plainIndigenous)}
      >
        平地原住民
      </StyledTab>
      <StyledTab
        isSelected={selected === tabs.mountainIndigenous}
        onClick={() => onTab(tabs.mountainIndigenous)}
      >
        山地原住民
      </StyledTab>
    </StyledTabs>
  )
}

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

  h3 {
    display: inline-block;
    font-size: 32px;
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
`

/**
 *  @param {Object} props
 *  @param {number} props.year
 *  @param {string} props.title
 *  @param {ElectionDistricts} [props.districts=[]]
 */
export default function({ districts = [], year, title }) {
  const [tabSelected, setTabSelected] = useState(tabs.district)
  let selectedDistricts = []

  switch (tabSelected) {
    case tabs.plainIndigenous: {
      selectedDistricts = districts.filter(
        (d) => d.type === tabs.plainIndigenous
      )
      break
    }
    case tabs.mountainIndigenous: {
      selectedDistricts = districts.filter(
        (d) => d.type === tabs.mountainIndigenous
      )
      break
    }
    case tabs.district:
    default: {
      selectedDistricts = districts
      break
    }
  }
  return (
    <Container>
      <Header>
        <h3>{year}</h3>
        <h3>{title}</h3>
      </Header>
      <Tabs selected={tabSelected} onTab={setTabSelected} />
      <StyledList districts={selectedDistricts} />
    </Container>
  )
}
