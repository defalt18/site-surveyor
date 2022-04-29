const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
	mode: 'production',
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
