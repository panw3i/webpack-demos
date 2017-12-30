var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },

    //  在不同的编译阶段 会做不同的事 ,一般是在生产环境
    plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}