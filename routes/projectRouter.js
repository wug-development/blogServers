const Router = require('koa-router')
const ProjectController = require('../controllers/projectController')

const router = new Router({
    prefix: '/project'
})

router.get('/:page', ProjectController.list)
router.get('/info/:id', ProjectController.detail)

module.exports = router;