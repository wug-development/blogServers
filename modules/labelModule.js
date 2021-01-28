/**
├── modules
    └── label.js
*/

// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
const { Op } = require('sequelize');
// 引入标签数据表模型文件
const Labels = Sequelize.import('../schema/labelSchema');
const Types = Sequelize.import('../schema/typeSchema');

class LabelModel {
    /**
     * 查询取标签详情数据
     * @param id  标签ID
     * @returns {Promise<Model>}
     */
    static async getLabelsDetail(id) {
        return await Labels.findOne({
            where: {
                'dnLabelID': id,
            },
        })
    }

    /**
     * 获取标签列表数据
     * @param page  页码
     * @param limit  n个记录
     * @param keyname  搜索关键字
     * @returns {Promise<Model>}
     */
    static async getLabelsList(page, limit, keyname = '') {
        const param = {
            offset: (page - 1) * limit,
            limit: Number(limit),
            attributes: [
                ['dnLabelID', 'id'],
                ['dcLabelName', 'name'],
                ['dcAddTime', 'addtime'],
                ['dcCategoryID', 'cid']
            ],
            order: [['dcAddTime','desc']],
            include: [
                {
                    model: Types,
                    attributes: ['dcCategoryName', 'cname']
                }
            ],
            where: {
                dcLabelName: {
                    [Op.like]: `%${keyname}%`
                }
            }
        }
        const p = param
        return await Labels.findAndCountAll(p)
    }

    /**
     * 获取标签列表数据
     * @param keyname  搜索关键字
     * @returns {Promise<Model>}
     */
    static async getLabelsCount(keyname = '') {
        const param = {
            offset: (page - 1) * limit,
            limit: Number(limit),
            order: [['dnLabelID','desc']],
            where: {
                dcLabelName: {
                    [Op.like]: `%${keyname}%`
                }
            }
        }
        const p = param
        return await Labels.findAll(p)
    }

    /**
     * 删除数据
     * @param id ID
     * @returns {Promise<Model>}
     */
    static async deleteLabels(id) {
        return await Labels.destroy({
            where: {
                'dnLabelID': id,
            },
        })
    }

    /**
     * 插入数据
     * @param list 数据
     * @returns {Promise<Model>}
     */
    static async insertLabels(list) {
        return await Labels.bulkCreate(list)
    }

    /**
     * 编辑数据
     * @param list 数据
     * @returns {Promise<Model>}
     */
    static async updateLabels(list, where) {
        return await Labels.update(list, {
            where
        })
    }
}

module.exports = LabelModel