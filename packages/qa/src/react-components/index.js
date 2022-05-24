import React from "react";
import Checkbox from "./form/checkbox";
import Landing from "./landing.js";

const MockFormData = {
  id: "1",
  name: "好像確診了，怎麼辦？",
  content: {
    blocks: [
      {
        key: "edm64",
        data: {},
        text: "迅速查詢確診相關資訊。這裡放短短的敘述。這裡放短短的敘述。",
        type: "unstyled",
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
      },
    ],
    entityMap: {},
  },
  heroImage: {
    id: "3",
    resized: {
      original:
        "https://storage.googleapis.com/statics-editools-dev/images/48fb802e-8c15-4d2f-9e5a-262bf355bf22.png",
    },
  },
  mobileImage: {
    id: "2",
    resized: {
      original:
        "https://storage.googleapis.com/statics-editools-dev/images/d1a0d1dc-49db-435e-b1a8-6b3bbd4e1263.jpg",
    },
  },
  updateTime: "2022-05-18T16:00:00.000Z",
};

export default function QA(props) {
  return (
    <>
      <Landing form={MockFormData} />
      <Checkbox title='你是否有以下經歷？（複選）' />
    </>
  );
}
