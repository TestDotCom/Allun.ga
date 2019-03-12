const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
//const HtmlWebPackPlugin = require("html-webpack-plugin");

var TARGET = process.env.npm_lifecycle_event;

var common = {
    entry: './src/Index.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                    plugins: [
                        'react-hot-loader/babel',
                        '@babel/plugin-transform-arrow-functions'
                    ]
                }
              }
        }],
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new Dotenv(),
        //new HtmlWebPackPlugin({
            //template: "./src/index.html",
            //filename: "index.html"
        //})
    ],
};

if(TARGET === 'start') {
    module.exports = merge(common, {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './build',
            // required for routing
            historyApiFallback: true,
        }
    });
  }
  
if(TARGET === 'build') {
    module.exports = merge(common, {
        mode: 'production',
        //devtool: 'source-map',
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    //sourceMap: true,
                }),
            ],
            //splitChunks: {
                //chunks: 'all'
            //},
        },
    });
}