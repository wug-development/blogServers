/**
├── modules
    └── label.js
*/

// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
const { Op } = require('sequelize');
// 引入类型数据表模型文件
const Types = Sequelize.import('../schema/typeSchema');

class TypeModel {
    /**
     * 查询取类型详情数据
     * @param id  类型ID
     * @returns {Promise<Model>}
     */
    static async getTypesDetail(id) {
        return await Types.findOne({
            where: {
                'dcCategoryID': id,
            },
        })
    }

    /**
     * 获取类型列表数据
     * @param page  页码
     * @param limit  n个记录
     * @param keyname  搜索关键字
     * @returns {Promise<Model>}
     */
    static async getTypesList(page, limit, keyname = '') {
        const param = {
            offset: (page - 1) * limit,
            limit: Number(limit),
            attributes: [
                ['dcCategoryID', 'id'],
                ['dcCategoryName', 'name'],
                ['dtCreateTime', 'addtime']
            ],
            order: [['dtCreateTime','desc']],
            where: {
                dcCategoryName: {
                    [Op.like]: `%${keyname}%`
                }
            }
        }
        const p = param
        return await Types.findAndCountAll(p)
    }

    /**
     * 获取类型列表数据
     * @param keyname  搜索关键字
     * @returns {Promise<Model>}
     */
    static async getTypesCount(keyname = '') {
        const param = {
            offset: (page - 1) * limit,
            limit: Number(limit),
            order: [['dcCategoryID','desc']],
            where: {
                dcCategoryName: {
                    [Op.like]: `%${keyname}%`
                }
            }
        }
        const p = param
        return await Types.findAll(p)
    }

    /**
     * 删除数据
     * @param id ID
     * @returns {Promise<Model>}
     */
    static async deleteTypes(id) {
        return await Types.destroy({
            where: {
                'dcCategoryID': id,
            },
        })
    }

    /**
     * 插入数据
     * @param list 数据
     * @returns {Promise<Model>}
     */
    static async insertTypes(list) {
        return await Types.bulkCreate(list)
    }

    /**
     * 编辑数据
     * @param list 数据
     * @returns {Promise<Model>}
     */
    static async updateTypes(list, where) {
        return await Types.update(list, {
            where
        })
    }
}

module.exports = TypeModel