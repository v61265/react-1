export default {
  form: {
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
  },
  fields: [
    {
      id: "10",
      name: "測試 dropdown (單選題，選項大於等於 4)",
      type: "single",
      sortOrder: 2,
      options: [
        {
          id: "37",
          name: "dropdown 選項 A",
          value: "a",
        },
        {
          id: "38",
          name: "dropdown 選項 B",
          value: "b",
        },
        {
          id: "39",
          name: "dropdown 選項 C",
          value: "c",
        },
        {
          id: "40",
          name: "dropdown 選項 D",
          value: "d",
        },
      ],
    },
    {
      id: "11",
      name: "測試 checkbox（複選題）",
      type: "multiple",
      sortOrder: 3,
      options: [
        {
          id: "26",
          name: "checkbox 選項 C",
          value: "c",
        },
        {
          id: "24",
          name: "checkbox  選項 A",
          value: "a",
        },
        {
          id: "30",
          name: "checkbox  選項 D",
          value: "d",
        },
        {
          id: "32",
          name: "checkbox 選項 B",
          value: "b",
        },
      ],
    },
    {
      id: "9",
      name: "測試 radio（單選題，選項小於等於 3 個）",
      type: "single",
      sortOrder: 1,
      options: [
        {
          id: "34",
          name: "radio 選項 A",
          value: "a",
        },
        {
          id: "35",
          name: "radio 選項 B",
          value: "b",
        },
        {
          id: "36",
          name: "radio 選項 C",
          value: "c",
        },
      ],
    },
  ],
  answers: [
    {
      id: "3",
      name: "Answer A",
      content: {
        blocks: [
          {
            key: "d3s5d",
            data: {},
            text: "結果內容測試。",
            type: "unstyled",
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
          },
          {
            key: "5lpms",
            data: {},
            text: "顏色變換。",
            type: "unstyled",
            depth: 0,
            entityRanges: [
              {
                key: 0,
                length: 4,
                offset: 0,
              },
            ],
            inlineStyleRanges: [],
          },
          {
            key: "299cc",
            data: {},
            text: "放一張圖。",
            type: "unstyled",
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
          },
          {
            key: "2bld0",
            data: {},
            text: "",
            type: "unstyled",
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
          },
          {
            key: "fap0a",
            data: {},
            text: " ",
            type: "atomic",
            depth: 0,
            entityRanges: [
              {
                key: 1,
                length: 1,
                offset: 0,
              },
            ],
            inlineStyleRanges: [],
          },
          {
            key: "39tn",
            data: {},
            text: "",
            type: "unstyled",
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
          },
        ],
        entityMap: {
          "0": {
            data: {
              color: "#ED883F",
            },
            type: "COLORTEXT",
            mutability: "MUTABLE",
          },
          "1": {
            data: {
              id: "2",
              desc: "",
              name: "meme",
              resized: {
                original:
                  "https://storage.googleapis.com/statics-editools-dev/images/d1a0d1dc-49db-435e-b1a8-6b3bbd4e1263.jpg",
              },
              imageFile: {
                url: "/images/d1a0d1dc-49db-435e-b1a8-6b3bbd4e1263.jpg",
              },
            },
            type: "image",
            mutability: "IMMUTABLE",
          },
        },
      },
      updatedAt: "2022-05-24T14:16:00.865Z",
      createdAt: "2022-05-21T17:21:58.759Z",
    },
    {
      id: "4",
      name: "Answer B",
      content: {
        blocks: [
          {
            key: "5kj83",
            data: {},
            text: "大標。",
            type: "header-two",
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
          },
          {
            key: "dsgfs",
            data: {},
            text: "測試內容。",
            type: "unstyled",
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
          },
          {
            key: "e2bpa",
            data: {},
            text: "測試 link。",
            type: "unstyled",
            depth: 0,
            entityRanges: [
              {
                key: 0,
                length: 7,
                offset: 0,
              },
            ],
            inlineStyleRanges: [],
          },
          {
            key: "apdtu",
            data: {},
            text: "",
            type: "unstyled",
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
          },
        ],
        entityMap: {
          "0": {
            data: {
              url: "readr.tw",
            },
            type: "LINK",
            mutability: "MUTABLE",
          },
        },
      },
      updatedAt: "2022-05-24T14:15:54.551Z",
      createdAt: "2022-05-21T16:59:45.983Z",
    },
  ],
  conditions: [
    {
      order: 1,
      type: "AND",
      condition: [
        {
          formField: {
            name: "測試 checkbox（複選題）",
            id: "11",
          },
          compare: "include",
          option: [
            {
              id: "24",
              name: "checkbox  選項 A",
              value: "a",
            },
            {
              id: "32",
              name: "checkbox 選項 B",
              value: "b",
            },
          ],
        },
      ],
      next: null,
      goOut: "",
      answer: {
        id: "4",
        name: "Answer B",
      },
    },
    {
      order: 2,
      type: "OR",
      condition: [
        {
          formField: {
            name: "測試 checkbox（複選題）",
            id: "11",
          },
          compare: "include",
          option: [
            {
              id: "24",
              name: "checkbox  選項 A",
              value: "a",
            },
          ],
        },
        {
          formField: {
            name: "測試 checkbox（複選題）",
            id: "11",
          },
          compare: "include",
          option: [
            {
              id: "32",
              name: "checkbox  選項 B",
              value: "b",
            },
          ],
        },
        {
          formField: {
            name: "測試 checkbox（複選題）",
            id: "11",
          },
          compare: "include",
          option: [
            {
              id: "26",
              name: "checkbox  選項 C",
              value: "c",
            },
          ],
        },
        {
          formField: {
            name: "測試 checkbox（複選題）",
            id: "11",
          },
          compare: "include",
          option: [
            {
              id: "30",
              name: "checkbox  選項 D",
              value: "d",
            },
          ],
        },
      ],
      next: null,
      goOut: "",
      answer: {
        id: "3",
        name: "Answer A",
      },
    },
    {
      order: 3,
      type: "AND",
      condition: [
        {
          formField: {
            name: "測試 dropdown (單選題，選項大於等於 4)",
            id: "10",
          },
          compare: "is",
          option: [
            {
              id: "40",
              name: "dropdown 選項 D",
              value: "d",
            },
          ],
        },
      ],
      next: null,
      goOut: "",
      answer: {
        id: "4",
        name: "Answer B",
      },
    },
    {
      order: 4,
      type: "AND",
      condition: [
        {
          formField: {
            name: "測試 dropdown (單選題，選項大於等於 4)",
            id: "10",
          },
          compare: "not",
          option: [
            {
              id: "40",
              name: "dropdown 選項 D",
              value: "d",
            },
          ],
        },
      ],
      next: {
        id: "11",
        name: "測試 checkbox（複選題）",
      },
      goOut: "",
      answer: null,
    },
    {
      order: 5,
      type: "OR",
      condition: [
        {
          formField: {
            name: "測試 radio（單選題，選項小於等於 3 個）",
            id: "9",
          },
          compare: "is",
          option: [
            {
              id: "34",
              name: "radio 選項 A",
              value: "a",
            },
          ],
        },
        {
          formField: {
            name: "測試 radio（單選題，選項小於等於 3 個）",
            id: "9",
          },
          compare: "is",
          option: [
            {
              id: "35",
              name: "radio 選項 B",
              value: "b",
            },
          ],
        },
        {
          formField: {
            name: "測試 radio（單選題，選項小於等於 3 個）",
            id: "9",
          },
          compare: "is",
          option: [
            {
              id: "36",
              name: "radio 選項 C",
              value: "c",
            },
          ],
        },
      ],
      next: {
        id: "10",
        name: "測試 dropdown (單選題，選項大於等於 4)",
      },
      goOut: "",
      answer: null,
    },
  ],
};
