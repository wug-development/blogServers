module.exports = {
    devServer: {
        open: false,
        disableHostCheck: false,
        host: '',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://192.168.11.69:3001',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}