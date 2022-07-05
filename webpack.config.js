const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './'),
    mode: 'development',
    entry: ['@babel/polyfill', './src/js/index.js'],
    resolve: {
        extensions: ['.js', '.scss']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
        assetModuleFilename: 'src/assets/images/[name].[ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '../css/[name].css'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            'patterns': [
                { from: './src/assets/images', to: '../assets/images' },
                { from: './src/favicon.ico', to: '../' }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'
            }
        ]
    }
};