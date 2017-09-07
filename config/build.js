
const base = require('./webpack.base');
const merge = require('webpack-merge');
var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackPro = require('./webpack.pro')
const webpackConfig = merge(base,webpackPro);

var spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, function (err, stats) {
	spinner.stop()
	if (err) throw err
	process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n\n')

	console.log(chalk.cyan('  Build complete.\n'))
})