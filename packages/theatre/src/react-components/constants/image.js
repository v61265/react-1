import { types } from '@theatre/core'

export const IMAGE = {
  position: types.compound({
    x: types.number(50, {
      range: [0, 100],
      nudgeMultiplier: 0.5,
    }),
    y: types.number(50, {
      range: [0, 100],
      nudgeMultiplier: 0.5,
    }),
  }),
  size: types.compound({
    width: types.number(200, {
      range: [0, 1200],
      nudgeMultiplier: 1,
    }),
    height: types.number(100, {
      range: [0, 1200],
      nudgeMultiplier: 1,
    }),
  }),

  border: types.compound({
    size: types.number(0),
    color: types.rgba({ r: 0, g: 0, b: 0, a: 1 }),
    radius: types.number(0, {
      range: [0, 100],
      nudgeMultiplier: 1,
    }),
  }),
  url: types.string(''),
  opacity: types.number(1, {
    range: [0, 1],
    nudgeMultiplier: 0.05,
  }),
  visible: types.boolean(true),
}
