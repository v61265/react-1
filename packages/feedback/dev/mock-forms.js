export const formsData = {
  forms: [
    {
      id: '2',
      name: 'feedback-like',
      slug: 'feedback-like',
      type: 'form',
      active: true,
      fieldsCount: 1,
      fields: [
        {
          id: '6',
          name: '這個結果符合實際情況嗎？',
          type: 'single',
          status: 'published',
          sortOrder: null,
        },
      ],
    },
    {
      id: '3',
      name: 'feedback-comment',
      slug: 'feedback-comment',
      type: 'form',
      active: true,
      fieldsCount: 1,
      fields: [
        {
          id: '7',
          name: '跟大家分享你的經驗...',
          type: 'text',
          status: 'published',
          sortOrder: null,
          commentListTitle: '',
          shouldShowItemControl: false,
        },
      ],
    },
    {
      id: '10',
      name: 'feedback-single',
      fields: [
        {
          id: '14',
          name: '這段讓你覺得...',
          type: 'single',
          options: [
            {
              name: '很讚',
              value: 'good',
              iconUrl: '/assets/good.svg',
            },
            {
              name: '超愛',
              value: 'very-good',
              iconUrl: '/assets/very-good.svg',
            },
            {
              name: '想哭',
              value: 'sad',
              iconUrl: '/assets/sad.svg',
            },
            {
              name: '驚訝',
              value: 'shock',
              iconUrl: '/assets/shock.svg',
            },
            {
              name: '生氣',
              value: 'angry',
              iconUrl: '/assets/angry.svg',
            },
          ],
        },
      ],
    },
  ],
}
