const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const init = require('./webpack/init');
const loaders = require('./webpack/modules/loaders');
const entries = require('./webpack/modules/entries');
const htmlPlugins = require('./webpack/modules/html');

module.exports = {
    
    mode: process.env.NODE_ENV,
    
    entry: entries ,

    module: {
        rules: loaders
    },

    resolve: {
        extensions: ['.js', '.json', '.scss', '.css'],
        alias: {
            '@': init.SRC_DIR,
        },
    },

    output: {
        path: init.DIST_DIR,
        publicPath: 'auto',
        filename: '[name].js'
    },

    plugins: [

        ...htmlPlugins,

        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),

        new CleanWebpackPlugin({
            outputPath: init.DIST_DIR,
        }),

        new RemoveEmptyScriptsPlugin(),

        (process.env.NODE_ENV === 'development') ? new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: [init.DIST_DIR] },
            reload: true,
            files: init.SRC_DIR
        }): () => {},

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