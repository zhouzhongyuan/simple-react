import path from 'path';
const config = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react.js',
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ],
    },
};
module.exports = config;
