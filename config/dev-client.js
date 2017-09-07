const webpackBrowserLog = require('webpack-browser-log');
const merge = require('webpack-merge');
const webpackDev = require('./webpack.dev');
const base = require('./webpack.base');
const webpackConfig = merge(base,webpackDev);
const openBrowser = require('react-dev-utils/openBrowser');
const port = 3030;
const chalk = require('chalk');

const url = `http://localhost:${port}`;
new webpackBrowserLog(webpackConfig, {
  port : port,
  waitUntilValid() {
    openBrowser(url);
    console.log(`You application is running here ${chalk.bold(url)}`)
  } // default
});
