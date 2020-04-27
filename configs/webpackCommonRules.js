const path = require('path');
const isProduction = process.argv.some(arg => arg === '-p' || arg === '--production') ||
    process.env.NODE_ENV === 'production';

exports.files = [
    {
        test: /\.(svg|ico|png|gif|jpg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: 'images/[hash:base64:5].[ext]',
            },
        }],
    },
    {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: 'fonts/[hash:base64:5].[ext]',
            },
        }],
    },
];

exports.cssLoaders = [
    'style-loader',
    {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: '[local]--[hash:base64:5]'
            },
            importLoaders: 2,
        }
    },
    'resolve-url-loader',
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: path.resolve(__dirname, './postcss.config.js')
            }
        }
    }
];

