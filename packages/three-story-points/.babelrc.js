const isProduction = process.env.NODE_ENV === 'production'

export default {
  presets: [
    [
      '@babel/preset-env',
      {
        // preserve ES modules
        modules: false,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !isProduction,
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      { ssr: true, displayName: true, preprocess: false },
    ],
  ],
}
