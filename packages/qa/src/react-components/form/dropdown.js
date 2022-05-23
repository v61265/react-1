import React, { useState, useRef } from 'react'
import styled from 'styled-components'

const DropdownOptionList =styled.ul`
    position: relative;
    margin: 0; 
    padding: 4px 0;
        max-height: 240px;
        overflow-y: auto;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          right: 16px;
          left: 16px;
          height: 1px;
          background-color: #e0e0e0;
        }

`



const DropdownOption = styled.li`
  color: #000928;
  width: 100%;
  cursor: pointer;
  padding: 8px 16px;
  color: #000928;
  text-align: left;
  &:hover {
    color: #fff;
    background-color: #04295e;
    cursor: pointer;
  }
  `
const DropdownWrapper = styled.section`
    * {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 150%;
      box-sizing: border-box;
      font-family: 'Noto Sans CJK TC', sans-serif;
    }
    border-radius: 6px;
    border: 1px solid;
    width: 320px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin: 0 0 24px;
  `
const DropdownInput = styled.div`
      box-sizing: border-box;
      width: 100%;
      position: relative;
      cursor: pointer;
      font-size: 18px;
      padding: 1px;
      input {      
        padding: 12px 48px 12px 16px;
        outline: none;
        border: none;
      }
      .arrow {
        position: absolute;
        top: 42%;
        right: 16px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 10px 0 10px;
        border-color: #04295e transparent transparent transparent;
      }
  `
const mockOptionList =  ['選項一','選項二','選項三','選項四'] 
export default function Dropdown({optionList = mockOptionList }) {
  const inputRef = useRef(null);
  const [option, setOption] = useState('');
  const [isListOpen, setIsListOpen] = useState(false)

  const focusInput = () => {
    inputRef.current.focus();
    inputRef.current.style.borderColor = "#04295e"
  };

  const toggleList = () => {
    setIsListOpen((isListOpen)=>!isListOpen)
    focusInput()
  }
  const chooseOption  = (option)=>{
    setOption(option)
    toggleList()
  }

  const optionItem = optionList.map((item,index) =>
    <DropdownOption onClick={() => chooseOption(item)} key={index}>
      {item}
    </DropdownOption>);


  return (
    <div>
      <DropdownWrapper>
        <DropdownInput ref={inputRef} onClick={toggleList}>
          <input readOnly placeholder='請選擇' defaultValue={option} />
          <span className='arrow'></span>
        </DropdownInput>        
        {isListOpen &&
        <DropdownOptionList>
          {optionItem}
        </DropdownOptionList>
        }
      </DropdownWrapper>

    </div>
  )
}
