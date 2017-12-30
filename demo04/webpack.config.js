module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            // 创建 style 标签 将样式放入
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ]
    }
};