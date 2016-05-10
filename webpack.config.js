'use strict'
const webpack = require('webpack')
const path = require('path')
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  minChunks: 2
})
const providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
})
// const SassLintPlugin = require('sasslint-webpack-plugin')
const autoprefixer = require('autoprefixer')
const svgoConfig = JSON.stringify({
  plugins: [
  // TODO: Configure this plugin
  {removeTitle: true},
  {convertColors: {shorthex: false}},
  {convertPathData: false}
  ]
})
const merge = require('webpack-merge')
const parts = require('./lib/parts')
let config

const common = {
  devtool: 'eval',

  // Step 1: Source Maps
  // devtool: 'cheap-module-source-map',

  context: __dirname,
  entry: {
    'blog-post': './src/pages/blog-post',
    'blog-post-list': './src/pages/blog-post-list',
    'event-list': './src/pages/event-list',
    'job-list': './src/pages/job-list',
    'search-results': './src/pages/search-results',
    common: ['bootstrap-loader'],
    event: './src/pages/event',
    index: './src/pages/index',
    job: './src/pages/job'
  },
  output: {
    path: 'dist',
      // publicPath: '/assets/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },

  // Step 2: Node environment
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       'NODE_ENV': JSON.stringify('production')
  //     }
  //   })
  // ],

  plugins: [
    commonsPlugin,
    // new SassLintPlugin({
    //   glob: 'src/**/*.scss'
    // }),
    providePlugin
  ],

  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        loader: 'file'
      },
      {
        test: /.*\.svg$/,
        loaders: [
          'file',
          'svgo?' + svgoConfig
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
  },
  postcss: function () {
    return [autoprefixer]
  }
}

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {})
    break
  default:
    // Dev
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    )
}

module.exports = config
