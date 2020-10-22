/**
├── controllers
    └── article.js
*/
const ArticleModel = require('../modules/article')
const mysqls = require('../lib/mysql')
const Callback = require('../config/response')

class articleController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        if (req.title // 文章标题
            && req.author // 文章作者
            && req.content // 文章内容
            && req.category // 文章分类
        ) {
            try {
                // 创建文章模型
                const ret = await ArticleModel.createArticle(req);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await ArticleModel.getArticleDetail(ret.id);

                this.response.status = 200;
                this.body = {
                    code: 200,
                    msg: '创建文章成功',
                    data
                }

            } catch (err) {
                this.response.status = 412;
                this.body = {
                    code: 200,
                    msg: '创建文章失败',
                    data: err
                }
            }
        } else {
            this.response.status = 416;
            this.body = {
                code: 200,
                msg: '参数不齐全',
            }
        }

    }

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;

        if (id) {
            try {
                // 查询文章详情模型
                let data = await ArticleModel.getArticleDetail(id);
                this.response.status = 200;
                this.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                this.response.status = 412;
                this.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        } else {
            this.response.status = 416;
            this.body = {
                code: 416,
                msg: '文章ID必须传'
            }
        }
    }

    /**
     * 获取文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async list() {
        let _sql = 'select AdminID,AdminName,Email from airkx_admin where orderOper = ?;'
        let _list = await mysqls.query(_sql, v)
        this.response.status = 200;
        let res = Callback()
        res.data = _list
        this.body = res
    }
}

module.exports = articleController