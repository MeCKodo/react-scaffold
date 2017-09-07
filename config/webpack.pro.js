const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const extractCss = new ExtractTextPlugin({ filename: 'static/css/[name].[contenthash].css', allChunks: true });
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const isProduction = process.env.NODE_ENV === 'production';
let pro = {
	entry: {
		"index": ['./src/index.js'],
		vendor: ['react', 'react-dom'],
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: require('./cdn'),
		filename: 'static/js/[name].[chunkhash:8].js', // '[name].[chunkhash].js?'
		chunkFilename: 'static/js/[name].[id].[chunkhash:8].js',
	},
	devtool: false,
	module: {
		rules: [{
			test: /\.css$/,
			use: extractCss.extract({
				fallback: "style-loader",
				use: "css-loader!postcss-loader"
			})
		}, {
			test: /\.scss$/,
			use: extractCss.extract({
				fallback: "style-loader",
				use: "css-loader!postcss-loader!sass-loader"
			})
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
		}),
		extractCss,
		// extractVueStyle,
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					require('autoprefixer')({
						browsers: ['last 20 versions', 'safari 5', 'opera 12.1', 'ios 7', 'android 4', '> 10%']
					}),
				]
			}
		}),
		new OptimizeCSSPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				safe: true
			}
		}),
	]
};
if (isProduction) {
	pro.plugins.push(
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    })
	)
}
module.exports = pro;
