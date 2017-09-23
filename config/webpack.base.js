const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
  cache: true,
  output: {
    // publicPath: '/static/',
    path: resolve(__dirname, '../dist'),
    filename: '[name].js', // '[name].[chunkhash].js'
    chunkFilename: '[id].js',
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    // noParse: /jquery|zepto|vue|vue-router|vuex/,
    rules: [{
      test: /\.js|jsx$/,
      include: [resolve(__dirname, '../src')],
      use: ['happypack/loader?id=babel'],
    }, {
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'static/img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'static/fonts/[name].[hash:7].[ext]'
      }
    }]
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory=true'],
    }),
    /* new HappyPack({
      id: 'eslint',
      loaders: ['eslint-loader'],
    }), */
    new HappyPack({
      id: 'css',
      loaders: ['css-loader'],
    }),
    new HappyPack({
      id: 'sass',
      loaders: ['sass-loader'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    /*new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),*/
  ],
  devtool: '#cheap-module-eval-source-map',
};
