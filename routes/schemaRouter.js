const Router = require('koa-router')
const SchemaLib = require('../lib/schemalib')
const SchemasController = require('../controllers/schemaController')

const router = new Router({
    prefix: '/schema'
})

router.get('/', function *(next) {
    let _name = ''
    let _list = yield SchemaLib.getTables()
    let _data = {}
    yield this.render('schema', {
        title: _name,
        tnames: _list,
        data: _data
    });
});

router.get('/table/:name', function *() {
    let _name = this.params.name
    let _list = yield SchemaLib.getTables()
    let _data = yield SchemaLib.getColumns(_name)
    yield this.render('schema', {
        title: _name,
        tnames: _list,
        data: _data
    });
});

router.get('/column/:name', SchemasController.getColumns);

router.get('/columns/:name', SchemasController.yieldGetColumns);

module.exports = router;
