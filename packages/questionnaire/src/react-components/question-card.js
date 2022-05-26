import React from "react";
import styled from "styled-components";

const Card = styled.div`
  ${(props) =>
    props.isFristPage &&
    `  background: #ffffff;
    box-shadow: 0px 4px 4px -2px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 12px 16px;
    max-width: 320px;
    @media screen and (min-width: 768px) {
      padding: 16px 24px;
    }`}}
`;

export default function QuestionCard(props) {
  return <Card isFristPage={props.isFristPage}>{props.children}</Card>;
}
