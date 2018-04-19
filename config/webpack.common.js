const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const indexHTML = path.resolve(__dirname, '../index.html');

module.exports = {
    entry: path.resolve(__dirname, '../assets/scripts/bundle.js'),
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, '../dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'resolve-url-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: [/fonts/],
                use: [
                    'url-loader?limit=10000&name=images/[name].[ext]',
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: process.env.NODE_ENV === 'production',
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                            optipng: false, // disabled
                            pngquant: {
                                floyd: 0.5,
                                speed: 2
                            },
                            svgo: {
                                plugins: [
                                    { removeTitle: true },
                                    { convertPathData: false }
                                ]
                            }
                        }
                    }
                ]
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