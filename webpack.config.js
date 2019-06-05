const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const PUBLIC_DIR = './public'
const PUBLIC_FILE = 'index.html'

module.exports = {
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, PUBLIC_DIR),
        historyApiFallback: true,
        hot: true,
        port: 3340
    },
    entry: path.resolve(__dirname, 'src', 'main.js'),
    mode: 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [ '@babel/preset-env' ]
                },
                test: /\.js$/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                exclude: /node_modules/,
                loader: 'sass-loader',
                test: /\.(sass|scss)$/
            },
            {
                exclude: /node_modules/,
                loader: 'ts-loader',
                test: /\.ts$/
            }
        ]
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, PUBLIC_DIR, PUBLIC_FILE)
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            '@rav': path.resolve(__dirname, 'packages', 'rav')
        }
    },
    target: 'web'
}
