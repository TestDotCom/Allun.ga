const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/Index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|api)/,
            use: 'babel-loader'
        }]
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
        contentBase: './dist'
    }
}

module.exports = config;