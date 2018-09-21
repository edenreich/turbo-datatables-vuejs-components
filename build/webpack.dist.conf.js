var path = require('path');
var webpack = require('webpack');

module.exports = {
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    },
    entry: {
        main: path.resolve(__dirname, '../src/exporter.ts'),
    },
    resolve: {
        extensions: [ ".js", ".ts", ".vue" ]
    },
    output: {
        library: 'datatables',
        libraryTarget: 'commonjs2',
        publicPath: "/",
        path: path.resolve(__dirname, '../src/dist'),
        filename: 'Datatables.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true
                }
            }
        ]
    }
};