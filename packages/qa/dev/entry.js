import React from 'react'
import QAComponent from '../src/react-components'
import { createRoot } from 'react-dom/client'

const reactRootId = 'root'
const container = document.getElementById(reactRootId)
const root = createRoot(container)
const mockForm = {
  "fields": [
    {
      "id": "2",
      "name": "你現在的身體狀況如何？",
      "type": "single",
      "sortOrder": 2,
      "options": []
    },
    {
      "id": "5",
      "name": "你的疫苗接種狀況？",
      "type": "single",
      "sortOrder": 5,
      "options": []
    },
    {
      "id": "4",
      "name": "你是否懷孕？",
      "type": "single",
      "sortOrder": 4,
      "options": []
    },
    {
      "id": "1",
      "name": "你是否有以下經歷？",
      "type": "single",
      "sortOrder": 1,
      "options": [
        {
          "id": "1",
          "name": "都沒有，我想直接看最新資訊",
          "value": "1"
        },
        {
          "id": "2",
          "name": "與我同住的人確診",
          "value": "2"
        },
        {
          "id": "3",
          "name": "我快篩的結果是陽性",
          "value": "3"
        },
        {
          "id": "4",
          "name": "我 PCR 陽性確診",
          "value": "4"
        },
        {
          "id": "5",
          "name": "自國外入境者",
          "value": "5"
        },
        {
          "id": "6",
          "name": "我疑似接觸到確診者",
          "value": "6"
        }
      ]
    },
    {
      "id": "3",
      "name": "你是否符合以下身份或條件？",
      "type": "single",
      "sortOrder": 3,
      "options": [
        {
          "id": "11",
          "name": "都不是",
          "value": "1"
        },
        {
          "id": "12",
          "name": "滿 70 歲",
          "value": "2"
        },
        {
          "id": "13",
          "name": "滿 65 歲",
          "value": "3"
        },
        {
          "id": "14",
          "name": "65-69 歲且獨居",
          "value": "4"
        },
        {
          "id": "15",
          "name": "是 6 歲以下兒童",
          "value": "5"
        },
        {
          "id": "16",
          "name": "是 1 歲以下寶寶，且發燒超過 39 度",
          "value": "6"
        },
        {
          "id": "17",
          "name": "是 2 歲以下幼兒",
          "value": "7"
        },
        {
          "id": "18",
          "name": "小於 3 個月的寶寶，有發燒",
          "value": "8"
        }
      ]
    }
  ],
  "answers": [],
  "conditions": [
    {
      "order": "1",
      "type": "AND",
      "condition": [
        {
          "formField": {
            "name": "你是否有以下經歷？",
            "id": "1"
          },
          "compare": "is",
          "option": [
            {
              "id": "3",
              "name": "我快篩的結果是陽性",
              "value": "3"
            }
          ]
        },
      ],
      "next": {
        "name": "你是否符合以下身份或條件？",
        "type": "single",
        "sortOrder": 3,
        "options": [
          {
            "id": "11",
            "name": "都不是",
            "value": "1"
          },
          {
            "id": "12",
            "name": "滿 70 歲",
            "value": "2"
          },
          {
            "id": "13",
            "name": "滿 65 歲",
            "value": "3"
          },
          {
            "id": "14",
            "name": "65-69 歲且獨居",
            "value": "4"
          },
          {
            "id": "15",
            "name": "是 6 歲以下兒童",
            "value": "5"
          },
          {
            "id": "16",
            "name": "是 1 歲以下寶寶，且發燒超過 39 度",
            "value": "6"
          },
          {
            "id": "17",
            "name": "是 2 歲以下幼兒",
            "value": "7"
          },
          {
            "id": "18",
            "name": "小於 3 個月的寶寶，有發燒",
            "value": "8"
          }
        ]
      }
    }
  ]
}

root.render(<QAComponent form={mockForm} />)
