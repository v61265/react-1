import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  width: 100%;
  max-width: 320px;
  padding: 12px;
  font-family: "Noto Sans CJK TC";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  color: #ffffff;
  border-radius: 6px;
  border: 0;
  ${(props) =>
    props.diabled
      ? `
  background: #E0E0E0;`
      : `
      background: #04295e;
      &:hover {
        cursor: pointer;
        background: #000928;
      }
      `}
`;

export default function Button({ title, onClick, disabled }) {
  function handleOnClick(e) {
    if (!disabled) onClick(e);
  }
  return (
    <ButtonWrapper onClick={handleOnClick} diabled={disabled}>
      {title}
    </ButtonWrapper>
  );
}
