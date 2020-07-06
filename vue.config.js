const path = require('path')
// const webpack = require('webpack')

const resolve = dir => {
    return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? './'
    : './'

module.exports = {
    publicPath: BASE_URL,
    devServer: {
        proxy: {
            '/requestApi':{
                target: 'http://192.168.0.108/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/requestApi': ''
                }
            }
        }
    },
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('_c', resolve('./src/components'))
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
}
