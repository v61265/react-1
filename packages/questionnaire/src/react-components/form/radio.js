import React, { useState } from "react";
import styled from "styled-components";

/**
 *  @param {Object} props
 *  @param {import('../typedef').Option[]} props.options
 *  @param {string} props.title
 *  @param {string} props.checkedValue
 *  @param {Function} props.onChange
 *  @return React.ReactElement
 */

const Label = styled.label`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    .radiomark {
      border-color: #000928;
    }
  }
`;

const RadioInput = styled.input`
  display: none;
`;

const Radiomark = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 18px;
  margin-right: 8px;
  position: relative;

  ${(props) =>
    props.isChecked &&
    `
    border-color: #04295E;
    &::before {
      content: '';
      position: absolute;
      display: block;
      top: 3px;
      left: 3px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #04295e;
    }
    `}
`;

export default function Radio(props) {
  console.log({});
  const optionsJsx = props.options?.map((o, index) => (
    <React.Fragment key={index}>
      <Label htmlFor={`option-${o.id}`}>
        <RadioInput
          type='radio'
          id={`option-${o.id}`}
          name={props.title}
          value={o.value}
          checked={props.checkedValue === o.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <Radiomark
          className='radiomark'
          isChecked={props.checkedValue === o.value}
        />
        {o.name}
      </Label>
      <br />
    </React.Fragment>
  ));
  return (
    <>
      <h3>{props.title}</h3>
      {optionsJsx}
    </>
  );
}
