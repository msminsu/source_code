const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: ['@babel/polyfill','./src/index.js','./src/style2.scss'],// app: ['a.js','b.js']
  },
  devtool: 'inline-source-map', // 모듈의 에러위치 표시
  devServer: {
      contentBase: './dist',
      hot: true
  },
  module: {
    rules: [
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                // 'style-loader', 
                'css-loader',
                'sass-loader?outputStyle=expanded'
                 // 'sass-loader?outputStyle=compressed'
            ],
            exclude: /node_modules/
        },
        {
            test: /\.js$/,
            include:[
                path.resolve(__dirname,'src/js')
            ],
            use:{
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env"] }
            },
            exclude: /node_modules/
        }, 
        {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
                limit: 10000,
            }
        },
       
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: './css/style.css' })
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
};