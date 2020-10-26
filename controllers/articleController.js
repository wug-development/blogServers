/**
├── controllers
    └── article.js
*/
const ArticleModel = require('../modules/articleModule')
const mysqls = require('../lib/mysql')
const { tryCatch, notFound } = require('../config/response')

class articleController {
    /**
     * 获取文章详情
     * @returns {Promise.<void>}
     */
    static async detail() {
        let id = this.params.id
        if (id) {
            await tryCatch(this, async () => {
                return await ArticleModel.getArticleDetail(id)
            })
        } else {
            notFound(this, '文章ID必须传')
        }
    }

    /**
     * 删除文章
     * @returns {Promise.<void>}
     */
    static async delete() {
        let id = this.params.id
        if (id) {
            await tryCatch(this, async () => {
                return await ArticleModel.deleteArticle(id)
            })
        } else {
            notFound(this, '文章ID必须传')
        }
    }

    /**
     * 获取文章列表
     * @returns {Promise.<void>}
     */
    static async list() {
        let _page = this.params.page
        if (_page) {
            await tryCatch(this, async () => {
                return await ArticleModel.getArticleList(_page, 20)
            })
        } else {
            notFound(this)
        }
    }

    /**
     * 添加文章
     * @returns {Promise.<void>}
     */
    static async insert() {
        let _data = this.body
        if (_data) {
            await tryCatch(this, async () => {
                return await ArticleModel.insertArticle(_data)
            }, '添加失败')
        } else {
            notFound(this, '内容必须传')
        }
    }
}

module.exports = articleController