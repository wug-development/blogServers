/**
├── modules
    └── article.js
*/

// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入文章数据表模型文件
const Article = Sequelize.import('../schema/articleSchema');
// // 自动创建表
// Article.sync({force: false});

class ArticleModel {
    /**
     * 查询取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getArticleDetail(id) {
        return await Article.findOne({
            where: {
                'dcArticleID': id,
            },
        })
    }

    /**
     * 获取文章列表数据
     * @param page  页码
     * @param limit  n个记录
     * @returns {Promise<Model>}
     */
    static async getArticleList(page, limit) {
        return await Article.findAll({
            offset: (page - 1) * limit,
            limit
        })
    }

    /**
     * 删除数据
     * @param id ID
     * @returns {Promise<Model>}
     */
    static async deleteArticle(id) {
        return await Article.destroy({
            where: {
                'dcArticleID': id,
            },
        })
    }

    /**
     * 插入数据
     * @param list 数据
     * @returns {Promise<Model>}
     */
    static async insertArticle(list) {
        return await Article.bulkCreate(list)
    }
}

module.exports = ArticleModel