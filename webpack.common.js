const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        // print: './src/math.js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        //   new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({title:'Production'}),
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename:'[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};