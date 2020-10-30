/**
├── controllers
    └── account.js
*/
// const ArticleModel = require('../modules/articleModule')
const mysqls = require('../lib/mysql')
const util = require('util')
const { tryCatch, notFound, callback } = require('../config/response')

class AccountController {
    /**
     * 登陆
     * @returns {Promise.<void>}
     */
    static async login() {
        let _uname = this.query.uname
        let _upass = this.query.upass
        if (_uname && _upass) {
            await tryCatch(this, async () => {
                let _sql = util.format("select dcAdminID as id from t_admin where dcAdminName='%s' and dcAdminPass='%s'", String(_uname), String(_upass))
                let _data = await mysqls.query(_sql)
                if (_data.length > 0) {
                    return _data[0].id
                } else {
                    return ''
                }
            })
        } else {
            notFound(this, '账号密码不能为空')
        }
    }
}

module.exports = AccountController