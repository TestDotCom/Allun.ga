const path = require('path');
var merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

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
            use: 'babel-loader'
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
    devServer: {
        contentBase: './build',
        // required for routing
        historyApiFallback: true,
    },
    plugins: [
        new Dotenv(),
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