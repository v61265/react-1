const sizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
}

const devices = {
  mobileS: `(min-width: ${sizes.mobileS}px)`,
  mobileM: `(min-width: ${sizes.mobileM}px)`,
  mobileMBelow: `(max-width: ${sizes.mobileM - 1}px)`,
  mobileL: `(min-width: ${sizes.mobileL}px)`,
  mobileLBelow: `(max-width: ${sizes.mobileL - 1}px)`,
  tablet: `(min-width: ${sizes.tablet}px)`,
  tabletBelow: `(max-width: ${sizes.tablet - 1}px)`,
  laptop: `(min-width: ${sizes.laptop}px)`,
  laptopBelow: `(max-width: ${sizes.laptop - 1}px)`,
  laptopL: `(min-width: ${sizes.laptopL}px)`,
  laptopLBelow: `(max-width: ${sizes.laptopL - 1}px)`,
  desktop: `(min-width: ${sizes.desktop}px)`,
  desktopBelow: `(max-width: ${sizes.desktop - 1}px)`,
}

export default { sizes, devices }
