
const merge = require('webpack-merge');
const webpackPro = require('./config/webpack.pro');
const base = require('./config/webpack.base');
const webpackConfig = merge(base,webpackPro);

module.exports = webpackConfig;