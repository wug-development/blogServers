const Router = require('koa-router')
const AuthController = require('../controllers/authController')

const router = new Router({
    prefix: '/auth'
})

router.get('/login', AuthController.login)
router.get('/register', AuthController.register)

module.exports = router;