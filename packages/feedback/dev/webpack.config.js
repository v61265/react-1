const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './entry.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    hot: false,
    host: '0.0.0.0',
    port: 8080,
    watchFiles: [
      path.resolve(__dirname, '../src/app/*.js'),
      path.resolve(__dirname, '../src/app/**/*.js'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
  devtool: 'eval-source-map',
}
