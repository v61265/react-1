import React from "react";
import styled from "styled-components";

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

const LandingTitle = styled.h1`
  margin-top: 12px;
  margin-bottom: 0;
  font-family: "Noto Serif TC", sans-serif;
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
  font-family: "Noto Sans CJK TC", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: rgba(0, 9, 40, 0.5);
`;

const LandingDesc = styled.p`
  margin-top: 24px;
  margin-bottom: 0;
  font-family: "Noto Sans CJK TC", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 200%;
  color: #000928;
`;

const HeroImage = styled.img`
  max-width: 100%;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const MobileHeroImage = styled.img`
  max-width: 100%;
  @media (min-width: 768px) {
    display: none;
  }
`;

export default function Landing({ form }) {
  function formatTime(time) {
    const d = new Date(time);
    return `${d.getFullYear()}.${("0" + (d.getMonth() + 1)).slice(-2)}.${(
      "0" + d.getDate()
    ).slice(-2)} ${("0" + d.getHours()).slice(-2)}:${(
      "0" + d.getMinutes()
    ).slice(-2)}`;
  }
  return (
    <Wrapper>
      <HeroImage src={form.heroImage?.resized?.original} alt={form.name} />
      <MobileHeroImage
        src={form.mobileImage?.resized?.original}
        alt={form.name}
      />
      <LandingTitle>{form.name}</LandingTitle>
      <LandingUpdateTime>{formatTime(form.updateTime)}</LandingUpdateTime>
      <LandingDesc>{form.content?.blocks?.[0]?.text}</LandingDesc>
    </Wrapper>
  );
}
