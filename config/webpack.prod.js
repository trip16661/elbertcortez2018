const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(commonConfig, {
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'resolve-url-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './config/postcss.config.js'
                                },
                                sourceMap: true
                            }
                        },
                        'sass-loader?sourceMap'
                    ]
                })
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        root: path.resolve(__dirname, '../'),
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'img-loader',
                        options: {
                            limit: 15000,
                            name: 'images/[name].[ext]'
                        }
                    },
                ],
            }
        ]
    },
    mode: 'production',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            // minimize: true,
            debug: false
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new ExtractTextPlugin('styles.css'),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve( __dirname, '../' )
        })
    ]
});