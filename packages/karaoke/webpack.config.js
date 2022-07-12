// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')

const webpackAssets = {
  chunks: [],
  bundles: [],
}

const isProduction = process.env.NODE_ENV === 'production'

function BundleListPlugin() {}

BundleListPlugin.prototype.apply = function(compiler) {
  const cdnLinkPrefix = `https://unpkg.com/${pkg.name}@${pkg.version}/dist`
  const distDir = './dist'

  compiler.hooks.emit.tap('BundleListPlugin', function(compilation) {
    for (const filename in compilation.assets) {
      const isBundle = filename.endsWith('bundle.js')
      const scriptSrc = isProduction
        ? `${cdnLinkPrefix}/${filename}`
        : `/dist/${filename}`

      if (isBundle) {
        webpackAssets.bundles.push(scriptSrc)
      } else {
        webpackAssets.chunks.push(scriptSrc)
      }
    }

    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir)
    }

    fs.writeFileSync(
      path.resolve(__dirname, `${distDir}/webpack-assets.json`),
      JSON.stringify(webpackAssets)
    )
  })
}

const webpackConfig = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: path.resolve(__dirname, './src/build-code/client.js'),
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, './dist/'),
    library: '@readr-media/react-questionnaire',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|styled-components)[\\/]/,
          name: 'reactvendor',
          filename: '[name].[chunkhash].chunk.js',
        },
        draftjsVendor: {
          test: /[\\/]node_modules[\\/](draft-js)[\\/]/,
          name: 'draftjsvendor',
          filename: '[name].[chunkhash].chunk.js',
        },
        immutableVendor: {
          test: /[\\/]node_modules[\\/](immutable)[\\/]/,
          name: 'immutablevendor',
          filename: '[name].[chunkhash].chunk.js',
        },
        lodashVendor: {
          test: /[\\/]node_modules[\\/](lodash)[\\/]/,
          name: 'lodashvendor',
          filename: '[name].[chunkhash].chunk.js',
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          filename: '[name].[chunkhash].chunk.js',
        },
      },
    },
  },
  plugins: [new BundleListPlugin() /*, new BundleAnalyzerPlugin()*/],
}

module.exports = webpackConfig
