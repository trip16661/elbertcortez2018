const path = require( 'path' );

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
    ]
};