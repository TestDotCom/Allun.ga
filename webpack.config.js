const path = require("path");
const { merge } = require('webpack-merge');
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const common = {
    entry: path.resolve(__dirname, 'src/Index.jsx'),
    output: { path: path.resolve(__dirname, 'dist') },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new Dotenv(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            favicon: path.resolve(__dirname, 'src/img/favicon.ico'),
        }),
        new CleanWebpackPlugin(),
    ]
};

const devel = {
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // required for routing
        historyApiFallback: true,
    },
    devtool: 'eval-source-map'
};

module.exports = env => {
    if (env === 'development') {
        return merge(common, devel)
    }

    return common
}
