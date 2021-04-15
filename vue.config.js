
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        port: 2364,
        open: true, //配置自动启动浏览器
        host: "127.0.0.1",
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // 配置多个代理
            "/api": {
                target: "http://localhost:8081",//这里改成你自己的后端api端口地址，记得每次修改，都需要重新build
                //target: "http://localhost:58427",
                //target: "http://api.douban.com",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    // 路径重写，
                    "^/apb": "" // 替换target中的请求地址
                }
            },
            "/images": {
                target: "http://localhost:8081",
                ws: true,
                changeOrigin: true
            },
            "/is4api": {
                target: "http://localhost:5004",
                ws: true,
                changeOrigin: true
            },
        },
        //before: require('./mock/mock-server.js')
        before: app => { }
    },
    chainWebpack(config) {
        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch')

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}