const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const path = require("path");

module.exports = (_, { mode }) => ({
    entry: path.resolve(__dirname, "./src/index.js"),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            // {
            //     test: /\.css$/i,
            //     use: ["style-loader", "css-loader"]
            // },
            {
                test: /\.css$/i,
                use: [mode === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
                    "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
        publicPath: '/'
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
        template: "./src/index.html"
    })],
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000/'
        },
        contentBase: path.resolve(__dirname, "./dist"),
        hot: true,
        historyApiFallback: true,

    },
});