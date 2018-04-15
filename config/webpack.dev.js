const merge        = require( 'webpack-merge' );
const commonConfig = require( './webpack.common.js' );
const webpack      = require( 'webpack' );

module.exports = merge( commonConfig, {
    devtool: 'eval',
    devServer: {
        compress: true,
        hot: true, 
        // contentBase: './.',
        // watchContentBase: true        
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader', 
                        options: {
                            config: {
                                path: './config/postcss.config.js'
                            }
                        }
                    },
                    'resolve-url-loader',
                    'sass-loader?sourceMap'
                ]
            }
        ]
    },
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
