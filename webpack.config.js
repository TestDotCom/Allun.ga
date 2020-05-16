const path = require("path");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var TARGET = process.env.npm_lifecycle_event;

var common = {
    entry: "./src/Index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {},
                },
              },
        ]
    },
    resolve: {
        extensions: [
            ".js",
            ".jsx"
        ],
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    plugins: [
        new Dotenv(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            favicon: "src/img/favicon.ico",
        }),
        new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['dist'] }),
    ],
};

if(TARGET === "start") {
    module.exports = merge(common, {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            contentBase: "./dist",
            // required for routing
            historyApiFallback: true,
        }
    });
}
  
if(TARGET === "build") {
    module.exports = merge(common, {
        mode: "production",
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true
                }),
            ]
        },
    });
}
