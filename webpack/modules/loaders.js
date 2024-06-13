const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const init = require('../init');

module.exports = [

        {
            test: /\.(html|pug)$/i,
            use: [
                {
                    loader: 'html-loader',
                    options: {
                        esModule: false,
                        sources: false,
                    },
                },
                {
                    loader: 'pug-html-loader',
                    options: {

                        pretty: true,
                        // data:
                    }
                },
            ]
        },

        {
            test: /\.(scss|sass|css)$/i, 
            use: [

                MiniCssExtractPlugin.loader,

                {
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: true,
                        modules: false,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                ['autoprefixer', { grid: true }],
                            ]
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: [path.resolve(__dirname, 'node_modules')],
                        }
                    }
                },
            ]
        },

        {
        test: /\.js$/i,
        exclude: /node_modules|\vue\/dist|\vue-loader/,
        use: (process.env.NODE_ENV === 'development') ? 
        [
            {
                loader:'esbuild-loader',
                options: {
                    loader: 'js',
                    target: 'esnext',
                },
            }, 
            // {
            //     loader:'eslint-loader',
            //     options: {
            //         fix: true,
            //         failOnError: true,
            //         emitWarning: true
            //     }
            // }
        ] : 
        {
            loader:'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                // plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
        },
];