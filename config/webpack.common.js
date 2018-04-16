const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const indexHTML = path.resolve( __dirname, '../index.html' );

module.exports = {
    entry: path.resolve( __dirname, '../assets/scripts/bundle.js' ),
    output: {
        filename: "[name].js",
        path: path.resolve( __dirname, '../dist' ),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
				query: {
                    presets: [ 'env' ]
				}
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader', 'resolve-url-loader' ]
            },
            {
                test: /\.(ttf|eot|otf|woff|woff2|svg)$/,
                loader: 'file-loader',
                exclude: [/images/],
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Elbert Cortez',
            hash: true,
            template: indexHTML
        })
    ]
};