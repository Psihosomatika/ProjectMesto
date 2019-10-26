const path = require('path');//Путь
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{ // тут описываются правила
            test: /\.js$/, // регулярное выражение, которое ищет все js файлы
            use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
            exclude: /node_modules/ // исключает папку node_modules НУЖНА
            },
            {
            test: /\.css$/, // применять это правило только к CSS-файлам
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили 
            },
            {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: {
                loader: 'file-loader?name=./images/[name].[ext]'
            },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./fonts/[name].[ext]',
            }
            
        ]
    },
    plugins: [ 
        new MiniCssExtractPlugin({filename: './css/[name].[contenthash].css'}),
        new HtmlWebpackPlugin({ // настроили плагин
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}
