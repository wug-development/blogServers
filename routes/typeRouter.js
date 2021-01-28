const Router = require('koa-router')
const TypeController = require('../controllers/typeController')

const router = new Router({
    prefix: '/type'
})

router.get('/add', TypeController.addType)
router.get('/list', TypeController.getType)
router.get('/query', TypeController.getTypeList)
router.get('/del', TypeController.delType)
router.get('/edit', TypeController.editType)

module.exports = router;