import React from "react";
import styled from "styled-components";
import heroIcon from "file-loader!../assets/heroIcon.png";

const Wrapper = styled.div`
  margin: 20px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    margin: 40px auto 24px auto;
  }
`;

const HeroIcon = styled.div`
  width: 80px;
  height: 80px;
  background: url(${heroIcon});
  background-size: cover;
  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const LandingTitle = styled.h1`
  margin-top: 12px;
  margin-bottom: 0;
  font-family: "Noto Serif TC";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 150%;
  color: #000928;
  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const LandingUpdateTime = styled.p`
  margin-top: 8px;
  margin-bottom: 0;
  font-family: "Noto Sans CJK TC";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: rgba(0, 9, 40, 0.5);
`;

const LandingDesc = styled.p`
  margin-top: 24px;
  margin-bottom: 0;
  font-family: "Noto Sans CJK TC";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 200%;
  color: #000928;
`;

export default function Landing({ title, updateTime, description }) {
  return (
    <Wrapper>
      <HeroIcon />
      <LandingTitle>{title}</LandingTitle>
      <LandingUpdateTime>{updateTime}</LandingUpdateTime>
      <LandingDesc>{description}</LandingDesc>
    </Wrapper>
  );
}
