const Router = require('koa-router')
const AccountController = require('../controllers/accountController')

const router = new Router({
    prefix: '/account'
})

router.get('/login', AccountController.login)
router.get('/userinfo', AccountController.userInfo)

module.exports = router;