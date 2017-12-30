var webpack = require("webpack");
var DefinePlugin = require('webpack/lib/DefinePlugin');
module.exports = {

    context: process.cwd(), // 确定了编译的上下文环境
    watch: true, // 文件在改变的时候, 让 webpack 动态的更新
    //entry: './index.js', // ==> 相对于context ==> './index.js'  
    //entry: './index.js', // ==> path.resolve(context,entry)

    entry: {
        test: './main.js' //[name] ==>  test ,  这里的key 映射[name]值
    }
    devtool: 'source-map', // chrome debug 源文件而不是编译之后的文件 便于开发调试

    output: {
        path: path.resolve(process.cwd(), 'dist/'), // 导出编译文件的目录,最终生成都是绝对路径
        filename: '[name].js' // 导出编译的文件名
    },

    // 定义资源别名的映射关系
    resolve: {
        alias: { jquery: process.cwd() + '/src/lib/jquery.js', }
    },

    // 插件
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'underscore',
            React: 'react'
        }),
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],

    // webpack对module处理的核心
    module: {

        // 加载方式
        loaders: [{
            test: /\.js[x]?$/, // ==> 正则表达式 [以.js/.jsx结果], 满足条件则处理
            exclude: /node_modules/, // ==> 排除在loader的范围
            loader: 'babel-loader' // ==> 加载器, 用来处理相关的文件

            //ex: loader的功能 :将 ES6/7==> ES5 的代码 将一种代码形式转化为另一种代码形式 LESS ==> CSS

        }, {
            test: /\.less$/,
            loaders: ['style-loader', 'css-loader', 'less-loader']

            // loaders数组 等价于 loader:"less!css!style"
        }, {
            test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,

            // 
            loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
        }, {
            test: /\.html/,
            loader: "html-loader?" + JSON.stringify({ minimize: false })
        }]
    }
}