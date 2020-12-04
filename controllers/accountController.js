/**
├── controllers
    └── account.js
*/
// const ArticleModel = require('../modules/articleModule')
const mysqls = require('../lib/mysql')
const util = require('util')
const url = require('url')
const tokenLib = require('../lib/tokenDeal')
const { tryCatch, notFound } = require('../config/response')

class AccountController {
    /**
     * 获取用户信息
     * @returns {用户信息}
    */
    static async userInfo () {
        // const token = this.request.header.token
        let params = Object.assign({}, this.request.headers);
        if (params.token) {
            let t = params.token.split(' ')[1]
            let uid = tokenLib.getToken(t)
            if (uid) {
                await tryCatch(this, async () => {
                    let _sql = util.format("select dcAdminName as name, dcHeadImg as headimg from t_admin where dcAdminID='%s'", uid.value)
                    let _data = await mysqls.query(_sql)
                    if (_data.length > 0) {
                        return _data[0]
                    } else {
                        return {}
                    }
                })
            } else {
                tokenOut(this)
            }
        } else {
            notFound(this, '用户不存在')
        }
    }
}

module.exports = AccountController