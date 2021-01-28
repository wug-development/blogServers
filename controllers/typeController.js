/**
├── controllers
    └── type.js
*/
const mysqls = require('../lib/mysql')
const util = require('util')
const tokenLib = require('../lib/tokenDeal')
const Lib = require('../lib/lib')
const TypeModel = require('../modules/typeModule')
const { tryCatch, notFound } = require('../config/response')
const { Op } = require('sequelize')

class TypeController {
    /**
     * 添加类型
     * @returns {添加结果状态}
    */
    static async addType () {
        let _data = this.query
        if (_data && _data.name) {
            var param = [{
                dcCategoryID: Lib.getID('tp'),
                dcCategoryName: _data.name
            }]
            await tryCatch(this, async () => {
                return await TypeModel.insertTypes(param)
            }, '添加失败')
        } else {
            notFound(this, '内容必须传')
        }
    }
    
    /**
     * 编辑类型
     * @returns 编辑结果
    */
    static async editType () {
        let _data = this.query
        if (_data && _data.name && _data.id) {
            var param = {
                dcCategoryName: _data.name
            }
            await tryCatch(this, async () => {
                return await TypeModel.updateTypes(param, {
                    dcCategoryID: _data.id
                })
            }, '编辑失败')
        } else {
            notFound(this, '内容ID必须传')
        }
    }

    /**
     * 删除类型
     * @returns 删除结果
     */
    static async delType() {
        let id = this.query.id
        if (id) {
            await tryCatch(this, async () => {
                return await TypeModel.deleteTypes(id)
            })
        } else {
            notFound(this, '类型ID必须传')
        }
    }
    
    /**
     * 获取类型列表
     * @returns {Promise.<void>}
     */
    static async getType() {
        let _page = this.query.page
        let _pagenum = this.query.pagenum
        let _fkey = this.query.filter
        if (_page) {
            await tryCatch(this, async () => {
                let _where = ''
                if (_fkey) {
                    _where = ` and dcCategoryName like '%${_fkey}%' `
                }
                let _sql = util.format("select dcCategoryID as id, dcCategoryName as name from t_categorys where 1=1 %s limit %d, %d", _where, (Number(_page) - 1) * _pagenum, _page * _pagenum)
                let _data = await mysqls.query(_sql)
                _sql = util.format("select count(dcCategoryID) as total from t_categorys where 1=1 %s ", _where)
                let _total = await mysqls.query(_sql)
                if (_data.length > 0) {
                    return {
                        totalPage: _total[0],
                        data: _data
                    }
                } else {
                    return {}
                }
            })
        } else {
            notFound(this)
        }
    }
    
    /**
     * 获取类型列表
     * @returns {Promise.<void>}
     */
    static async getTypeList() {
        let _page = this.query.page
        let _pagenum = this.query.pagenum
        let _fkey = this.query.filter
        if (_page) {
            await tryCatch(this, async () => {
                return await TypeModel.getTypesList(_page, _pagenum, _fkey)
            })
        } else {
            notFound(this)
        }
    }
}

module.exports = TypeController