/**
├── controllers
    └── label.js
*/
const mysqls = require('../lib/mysql')
const util = require('util')
const tokenLib = require('../lib/tokenDeal')
const Lib = require('../lib/lib')
const LabelModel = require('../modules/labelModule')
const { tryCatch, notFound } = require('../config/response')
const { Op } = require('sequelize')

class LabelController {
    /**
     * 添加标签
     * @returns {添加结果状态}
    */
    static async addLabel () {
        let _data = this.query
        if (_data && _data.name) {
            var param = [{
                dcCategoryID: Lib.getID('tp'),
                dcCategoryName: _data.name
            }]
            await tryCatch(this, async () => {
                return await LabelModel.insertLabels(param)
            }, '添加失败')
        } else {
            notFound(this, '内容必须传')
        }
    }
    
    /**
     * 编辑标签
     * @returns 编辑结果
    */
    static async editLabel () {
        let _data = this.query
        if (_data && _data.name && _data.id) {
            var param = {
                dcCategoryName: _data.name
            }
            await tryCatch(this, async () => {
                return await LabelModel.updateLabels(param, {
                    dcCategoryID: _data.id
                })
            }, '编辑失败')
        } else {
            notFound(this, '内容ID必须传')
        }
    }

    /**
     * 删除标签
     * @returns 删除结果
     */
    static async delLabel() {
        let id = this.query.id
        if (id) {
            await tryCatch(this, async () => {
                return await LabelModel.deleteLabels(id)
            })
        } else {
            notFound(this, '标签ID必须传')
        }
    }
    
    /**
     * 获取标签列表
     * @returns {Promise.<void>}
     */
    static async getLabelList() {
        let _page = this.query.page
        let _pagenum = this.query.pagenum
        let _fkey = this.query.filter
        if (_page) {
            await tryCatch(this, async () => {
                return await LabelModel.getLabelsList(_page, _pagenum, _fkey)
            })
        } else {
            notFound(this)
        }
    }
    
    /**
     * 获取标签列表
     * @returns {Promise.<void>}
     */
    static async getLabel() {
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
}

module.exports = LabelController