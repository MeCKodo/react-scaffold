const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const os = require('os');
var HappyPack = require('happypack');

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
      "node_modules",
      path.resolve(__dirname, "../src"),
    ],
    extensions: ['.js', '.vue', '.json', '.jsx', '.scss'],
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
      loaders: [ 'babel-loader?cacheDirectory=true' ],
    }),
    /*new HappyPack({
      id: 'eslint',
      loaders: ['eslint-loader'],
    }),*/
    new HappyPack({
      id: 'css',
      loaders: [ 'css-loader?mportLoaders=1' ],
    }),
    new HappyPack({
      id: 'sass',
      loaders: [ 'sass-loader' ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    /* new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }), */
    new InlineChunkManifestHtmlWebpackPlugin(),
    /*new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),*/
  ],
  devtool: '#cheap-module-eval-source-map',
};
