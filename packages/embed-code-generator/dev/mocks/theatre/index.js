export default {
  animateJson: {
    sheetsById: {
      Scene: {
        staticOverrides: {
          byObject: {
            'font-001': { content: 'test ' },
            'video-001': {
              position: { x: 36.736111111111114, y: 58.17073170731707 },
              size: { width: 300, height: 200 },
              visible: true,
              isPlaying: true,
              isLoop: false,
              scale: 1,
              zIndex: '10',
            },
          },
        },
      },
    },
    definitionVersion: '0.4.0',
    revisionHistory: [],
  },

  objectJson: [
    { id: 'font-001', type: 'FONT' },
    {
      id: 'video-001',
      type: 'VIDEO',
      src:
        'https://storage.googleapis.com/statics-readr-tw-dev/files/test-e0u6aXKDeeLbFrNXXCi.mp4',
    },
  ],
  type: 'scroll',
}
