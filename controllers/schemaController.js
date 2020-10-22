/**
├── controllers
    └── article.js
*/
const mysqls = require('../lib/mysql')
const Schemas = require('../lib/schemalib')
const Callback = require('../config/response')
const config = require('../config/default')

class schemaController {
    /**
     * 获取所有表名
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getTables() {
        let _list = await Schemas.getTables()
        // this.response.status = 200;
        // let res = Callback()
        // res.data = _list
        // this.body = res
        return _list
    }

    /**
     * 获取表所有列名
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getColumns() {
        let _name = this.params.name
        let _list = await Schemas.getColumns(_name)
        this.response.status = 200;
        let res = Callback()
        res.data = _list
        this.body = res
        // return _list
    }

    /**
     * 获取表所有列名
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async  newGetColumns(v) {
        let _list = await Schemas.getColumns(v)
        // this.response.status = 200;
        // let res = Callback()
        // res.data = _list
        // this.body = res
        return _list
    }

    /**
     * 获取表所有列名
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async yieldGetColumns (ctx) {
        let _name = this.params.name
        let _list = await Schemas.getColumns(_name)
        this.render('schema', {
            title: 'schema',
            // tnames: _list,
            data: _list
        });
    }
}

module.exports = schemaController