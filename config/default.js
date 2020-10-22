const mysql = require('../set')
const config = {
    // 启动端口
    port: 3000,

    //数据库配置
    database: {
        DATABASE: mysql.DATABASE,
        USERNAME: mysql.USERNAME,
        PASSWORD: mysql.PASSWORD,
        PORT: '3306',
        HOST: mysql.PORT
    },
    security: {
        secretKey: "secretKey",
        // 过期时间 1小时
        expiresIn: 60 * 60
    },
    wx: {
        appId: '',
        appSecret: '',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}

module.exports = config