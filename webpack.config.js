const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'webpack-bundle.js',
        publicPath: 'build'
    },
    devServer: {
        proxy: {
            '/': 'http://localhost:3000'
        }
    },
    module: {
        rules: [
            {
                test: /jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    mode: 'development'
}