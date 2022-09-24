// const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default {
    mode: 'development',
    entry: './src/app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/public')
    },
    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        ]
    },
    plugins: [new MiniCssExtractPlugin()],
}