const Router = require('koa-router')
const LabelController = require('../controllers/labelController')

const router = new Router({
    prefix: '/label'
})

router.get('/add', LabelController.addLabel)
router.get('/list', LabelController.getLabel)
router.get('/query', LabelController.getLabelList)
router.get('/del', LabelController.delLabel)
router.get('/edit', LabelController.editLabel)

module.exports = router;