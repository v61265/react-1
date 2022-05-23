import React from "react";
import Checkbox from "./form/checkbox";
import Landing from "./landing.js";

export default function QA(props) {
  return (
    <>
      <Landing
        title='好像確診了，怎麼辦？'
        updateTime='2022.5.17 12:19 更新'
        description='迅速查詢確診相關資訊。這裡放短短的敘述。這裡放短短的敘述。'
      />
      <Checkbox title='你是否有以下經歷？（複選）' />
    </>
  );
}
