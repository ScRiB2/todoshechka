const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const commonRules = require('./configs/webpackCommonRules');

const isProduction = process.argv.some(arg => arg === '-p' || arg === '--production') ||
    process.env.NODE_ENV === 'production';

const productionCssLoaders = commonRules.cssLoaders.slice(1);

const webpackConfig = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',
    entry: {
        app: path.resolve(__dirname, './src/index.tsx')
    },
    module: {
        rules: commonRules.files.concat(
            [
                {
                    enforce: 'pre',
                    test: /\.css$/,
                    exclude: /node_modules/,
                    loader: 'typed-css-modules-loader',
                    options: {
                        noEmit: isProduction,
                        // camelCase: true
                    }
                },
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    exclude: {
                        test: /node_modules/,
                        exclude: path.resolve(__dirname, './src')
                    }
                },
                {
                    test: /.*\.css$/,
                    exclude: /node_modules/,
                    use: isProduction ?
                        [MiniCssExtractPlugin.loader].concat(productionCssLoaders) :
                        commonRules.cssLoaders
                }
            ]
        )
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './static/index.html')
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            'node_modules'
        ]
    },
    resolveLoader: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            'node_modules'
        ]
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].bundle.js'
    },
    devServer: {
        port: 8080,
        publicPath: '/',
        historyApiFallback: true
    }
};

if (isProduction) {

    webpackConfig.optimization = {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    };

    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: "styles.css",
        })
    );

    webpackConfig.plugins.push(
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        })
    )
}

module.exports = webpackConfig;
