var path = require('path');
var webpack = require('webpack');

module.exports = {
    target: 'node',
    context: path.resolve("src"),
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: true,
        tls: 'empty',
        child_process: 'empty'
    },
    entry: {
        main: './exporter.ts',
    },
    resolve: {
        extensions: [ ".js", ".ts" ]
    },
    output: {
        library: 'datatables',
        libraryTarget: 'commonjs2',
        publicPath: "/",
        path: path.resolve(__dirname, '../dist'),
        filename: 'Datatables.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
};