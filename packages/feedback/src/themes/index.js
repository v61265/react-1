const mediaSize = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  '3xl': 1600,
  '4xl': 1920,
}
const themes = {
  // 確診查詢器
  covid19: {
    breakpoint: {
      mobile: `(min-width: ${mediaSize.xs}px)`,
      tablet: `(min-width: ${mediaSize.md}px)`,
      desktop: `(min-width: ${mediaSize.xl}px)`,
    },
    thumbField: {
      title: {
        color: '#000000',
        lineHeight: '27px',
        fontWeight: 400,
        mobile: {
          fontSize: '18px',
        },
        tablet: {
          fontSize: '18px',
        },
      },
      label: {
        color: '#000000',
        lineHeight: '27px',
        fontWeight: 400,
        mobile: {
          fontSize: '18px',
        },
        tablet: {
          fontSize: '18px',
        },
      },
      thumb: {
        default: {
          color: '#E0E0E0',
          borderColor: '#E0E0E0',
          backgrounColor: 'rgba(0, 0, 0, 0)',
        },
        hover: {
          color: '#E0E0E0',
          borderColor: '#000928',
          backgrounColor: 'rgba(0, 0, 0, 0)',
        },
        active: {
          color: '#04295E',
          borderColor: '#000928',
          backgrounColor: '#EDEFF2',
        },
      },
      statistic: {
        color: 'rgba(0, 9, 40, 30%)',
        fontWeight: 400,
        mobile: {
          fontSize: '16px',
          lineHeight: '24px',
        },
        tablet: {
          fontSize: '16px',
          lineHeight: '24px',
        },
      },
    },
  },
}

export default themes
