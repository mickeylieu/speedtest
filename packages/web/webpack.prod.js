const CommonConfig = require("./webpack.common.js");
const Merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = Merge(CommonConfig, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css"
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            minify: {
                collapseWhitespace: true
            }
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        },
        minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()]
    }
});