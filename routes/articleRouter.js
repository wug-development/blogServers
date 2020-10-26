const Router = require('koa-router')
const ArticleController = require('../controllers/articleController')

const router = new Router({
    prefix: '/article'
})

router.get('/list/:page', ArticleController.list)
router.get('/info/:id', ArticleController.detail)
router.get('/del/:id', ArticleController.delete)

module.exports = router;