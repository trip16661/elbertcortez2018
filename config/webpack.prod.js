const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
                    loader: 'html-loader'
                }
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
        }),
        new CopyWebpackPlugin([
            {
              from: './*.txt',
              to: '../dist',
              toType: 'dir'
            },
            {
              from: './*.ico',
              to: '../dist',
              toType: 'dir'
            },
            {
              from: './*.xml',
              to: '../dist',
              toType: 'dir'
            },
        ])
    ]
});