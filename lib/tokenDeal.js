const jwt = require('jsonwebtoken')
const { tokenSecret } = require('../config/default')

class TokenLib {
    static setToken (v) {
        return jwt.sign({ value: v }, tokenSecret.secret, {expiresIn: tokenSecret.expiresIn})
    }
    static getToken (v) {
        return jwt.verify(v, tokenSecret.secret)
    }
}

module.exports = TokenLib