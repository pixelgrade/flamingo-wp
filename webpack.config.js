const webpack = require('webpack');
const path = require('path');

config = {
	"mode": "production",
	"entry": {
		preview: "./src/preview.js",
	},
	"output": {
		"path": path.resolve(__dirname, 'dist'),
		"filename": "[name].js"
	},
	"module": {
		"rules": [
			{
				"enforce": "pre",
				"test": /\.(js|jsx)$/,
				"exclude": /node_modules/,
			},
			{
				"test": /\.(js|jsx)$/,
				"exclude": /node_modules/,
				"use": {
					"loader": "babel-loader",
					"options": {
						"presets": [
							"env",
							"react"
						]
					}
				}
			},
			{
				"test": /\.scss$/,
				"use": [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	}
};

module.exports = config;