const webpack = require('webpack');
const { resolve } = require('path');
const FriendLyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
	entry: {
		index: [
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      './src/index.jsx'
    ],
		vendor: ['react', 'react-dom'],
	},
	module : {
    rules : [/*{
      test: /\.(js|vue|jsx)$/,
      use: ['happypack/loader?id=eslint'],
      include: [resolve(__dirname, '../src')],
      enforce: "pre",
    }*/{
			test: /\.css$/,
			use: ['style-loader', 'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]']
		}, {
			test: /\.scss$/,
			use: ['style-loader', 'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'sass-loader']
		}],
	},
	plugins : [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// extractVueStyle,
		new FriendLyErrorsPlugin({
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
        console.log(errors);
      },
		})
	]
};
