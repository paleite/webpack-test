'use strict'
const webpack = require('webpack')
// const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
//   name: 'common',
//   minChunks: 2
// })
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js', Infinity)
const providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery'
})
// const SassLintPlugin = require('sasslint-webpack-plugin')
const autoprefixer = require('autoprefixer')
// const svgoConfig = JSON.stringify({
//   plugins: [
//   // TODO: Configure this plugin
//   {removeTitle: true},
//   {convertColors: {shorthex: false}},
//   {convertPathData: false}
//   ]
// })
const merge = require('webpack-merge')
const parts = require('./lib/parts')
let config

const common = {
  // devtool: 'eval',

  context: __dirname,
  entry: {
    common: ['bootstrap-loader'],
    index: './src/pages/index',
    'blog-post': './src/pages/blog-post',
    'blog-post-list': './src/pages/blog-post-list',
    event: './src/pages/event',
    'event-list': './src/pages/event-list',
    job: './src/pages/job',
    'job-list': './src/pages/job-list',
    'search-results': './src/pages/search-results'
  },
  output: {
    path: 'dist',
      // publicPath: '/assets/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },

  plugins: [
    providePlugin,
    commonsPlugin
    // new SassLintPlugin({
    //   glob: 'src/**/*.scss'
    // }),
  ],

  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'postcss', 'sass', 'sass-resources']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015-webpack'
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loaders: [
      //     // 'file?hash=sha512&digest=hex&name=[hash].[ext]',
      //     'url?limit=25000',
      //     'resize-image?sizes[]=480w,sizes[]=768w,sizes[]=992w,sizes[]=1200w&placeholder'
      //   ]
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          // 'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'url?limit=10000'
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        loader: 'file'
      }
      // ,
      // {
      //   test: /.*\.svg$/,
      //   loaders: [
      //     'file',
      //     'svgo?' + svgoConfig
      //   ]
      // }
    ],
    imageWebpackLoader: {
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false
          },
          {
            removeEmptyAttrs: false
          }
        ]
      }
    }
  },
  sassResources: './src/scss/_sass-resources.scss',
  resolve: {
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['src', 'node_modules', 'bower_components']
  },
  postcss: function () {
    return [autoprefixer]
  }
}

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        // devtool: 'cheap-module-source-map',
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              // booleans: true,
              // conditionals: true,
              dead_code: true,
              // drop_debugger: true,
              drop_console: true,
              // if_return: true,
              // join_vars: true,
              screw_ie8: true,
              // sequences: true,
              // unused: true,
              warnings: false
            },
            comments: false,
            mangle: {
              // props: /matching_props/,
              except: ['$super', '$', 'exports', 'require']
            },
            output: {
              comments: false
            },
            sourceMap: false
          }),
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.optimize.DedupePlugin()
        ]
      }
    )
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
