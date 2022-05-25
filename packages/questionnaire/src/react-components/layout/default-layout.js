import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 24px 0;
  width: 600px;
  font-family: "Noto Sans TC", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: auto;
    margin: 0 20px;
    padding: 40px 0;
  }
`;

export default function DefaultLayout(props) {
  return <Wrapper>{props.children}</Wrapper>;
}
