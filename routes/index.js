const Router = require('koa-router')
const ArticleController = require('../controllers/article')

const router = new Router({
    prefix: '/api'
})

router.get('/', function *(next) {
    yield this.render('index', {
        title: 'Hello World Koa!'
    });
});

router.get('/article/:id', ArticleController.detail)
router.get('/queryarticle', ArticleController.list)

module.exports = router;
