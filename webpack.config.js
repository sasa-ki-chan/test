const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const init = require('./webpack/init');
const loaders = require('./webpack/modules/loaders');
const entries = require('./webpack/modules/entries');
const htmlPlugins = require('./webpack/modules/html');

module.exports = {
    
    mode: process.env.NODE_ENV === "development"? "development": "production",
    
    target: 'web',
    
    context: init.SRC_DIR,

    entry: entries,

    module: {
        rules: loaders
    },

    resolve: {
        extensions: ['.js', '.json', '.scss', '.css'],
        alias: {
            '@': init.SRC_DIR,
            '@js': init.JS_DIR
        }
    },

    output: {
        path: init.DIST_DIR,
        filename: '[name].js'
    },

    // optimization: {
    //     splitChunks: {
    //       name: init.DIST.JS +'lib',
    //       chunks: 'initial',
    //     }
    // },

    watch: true,


    devServer: {
        hot: true,
        open: true,
        static: {
            directory: init.DIST_DIR,
          },
        port: 3000,
        watchFiles: ["src/**/*.*"],
        watchFiles: ["src"],
         liveReload: true,
         historyApiFallback: true,
     },
    plugins: [

        ...htmlPlugins,

        new webpack.HotModuleReplacementPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),

        new CleanWebpackPlugin({
            outputPath: init.DIST_DIR,
        }),

        new RemoveEmptyScriptsPlugin(),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: init.IMG_DIR,
                    to: init.DIST_DIR + '/assets/img'
                },
            ]
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

    ],
}