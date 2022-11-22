import styled from 'styled-components'
import { useState } from 'react'

const partiesColor = [
  {
    index: 1,
    name: '中國國民黨',
    color: '#7CA1FF',
  },
  {
    index: 2,
    name: '民主進步黨',
    color: '#499A6C',
  },
  {
    index: 3,
    name: '台灣民眾黨',
    color: '#7EDBDB',
  },
  {
    index: 4,
    name: '時代力量',
    color: '#FFD337',
  },
  {
    index: 5,
    name: '台灣團結聯盟',
    color: '#CB9869',
  },
  {
    index: 6,
    name: '社會民主黨',
    color: '#F777B4',
  },
  {
    index: 7,
    name: '勞動黨',
    color: '#E24747',
  },
  {
    index: 8,
    name: '親民黨',
    color: '#F7973F',
  },
  {
    index: 9,
    name: '台灣基進',
    color: '#BB4429',
  },
  {
    index: 10,
    name: '新黨',
    color: '#FCFF70',
  },
  {
    index: 11,
    name: '綠黨',
    color: '#B4FA94',
  },
  {
    index: 12,
    name: '無黨團結聯盟',
    color: '#B43F93',
  },
  {
    index: 999,
    name: '無黨籍',
    color: '#333333',
  },
  {
    index: 1000,
    name: '其他政黨',
    color: '#958090',
  },
  {
    index: 1001,
    name: '開票中',
    color: '#fff',
  },
]

const getPartyColor = (party) => {
  const color =
    partiesColor.find((partyColor) => party.startsWith(partyColor.name))
      ?.color || partiesColor[partiesColor.length - 1].color
  return color
}

const SeatsChartWrapper = styled.div`
  font-size: 24px;
  line-height: 29px;
`

const SeatsChartYear = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  line-height: 120%;
  padding: 12px 0;
`

const SeartsChartTitle = styled.div`
  padding: 20px 0;
  text-align: center;
  background-color: #afafaf;
  font-weight: 700;
  line-height: 120%;
  padding: 12px 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 40px 39px 74px;
`

const SeatWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`

const Seat = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${/**
   *  @param {Object} props
   *  @param {string} props.bgColor
   */
  ({ bgColor }) => bgColor || '#fff'};
  border: solid 1px #000;
  border-radius: 50%;
`

const SeatInfo = styled.div`
  position: fixed;
  border-radius: 6px;
  max-width: 68px;
  padding: 4px;
  background-color: #000;
  color: #fff;
  font-size: 12px;
  line-height: 17.8px;
  top: 501px;
  left: 91px;
  ${/**
   *  @param {Object} props
   *  @param {number[]} props.coordinate
   */
  ({ coordinate }) =>
    coordinate.length
      ? `
      top: ${coordinate[1]}px;
      left: ${coordinate[0]}px;
    `
      : `
      top: 0;
      left: 0;
    `}
`

export default function SeatChart({ data, meta }) {
  const [hoverParty, setHoverParty] = useState({
    show: false,
    party: '',
    coordinate: [],
  })
  return (
    <SeatsChartWrapper>
      <SeatsChartYear>{meta.year}</SeatsChartYear>
      <SeartsChartTitle>{meta.location + meta.componentTitle}</SeartsChartTitle>
      <Wrapper>
        {hoverParty.show && (
          <SeatInfo coordinate={hoverParty.coordinate}>
            {hoverParty.party}
          </SeatInfo>
        )}
        {data.parties.reduce((total, party) => {
          const color = getPartyColor(party.label)
          return total.concat(
            [...Array(party.seats)].map((empty, i) => {
              return (
                <SeatWrapper
                  key={party.label + i}
                  onMouseOver={() => {
                    setHoverParty((value) => ({
                      ...value,
                      show: true,
                      party: party.label,
                    }))
                  }}
                  onMouseMove={(e) => {
                    setHoverParty((value) => ({
                      ...value,
                      coordinate: [e.clientX + 15, e.clientY],
                    }))
                  }}
                  onMouseLeave={() => {
                    setHoverParty({
                      show: false,
                      party: '',
                      coordinate: [],
                    })
                  }}
                >
                  <Seat bgColor={color} />
                </SeatWrapper>
              )
            })
          )
        }, [])}
      </Wrapper>
    </SeatsChartWrapper>
  )
}
