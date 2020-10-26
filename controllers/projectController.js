/**
├── controllers
    └── project.js
*/
const ProjectModel = require('../modules/projectModule')
const mysqls = require('../lib/mysql')
const Callback = require('../config/response')

class projectController {
    /**
     * 获取项目详情
     * @returns {Promise.<void>}
     */
    static async detail() {
        let id = this.params.id
        if (id) {
            try {
                console.log(ProjectModel)
                // 查询项目详情模型
                let data = await ProjectModel.getProjectDetail(id);
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
                    msg: '查询失败'
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
     * 获取项目详情
     * @returns {Promise.<void>}
     */
    static async delete() {
        let id = this.params.id
        if (id) {
            try {
                // 查询项目详情模型
                let data = await ProjectModel.deleteProject(id);
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
                    msg: '查询失败'
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
     * 获取项目列表
     * @returns {Promise.<void>}
     */
    static async list() {
        let _page = this.params.page
        if (_page) {
            let _sql = 'select * from t_projects where 1=1 limit ' + 20 * (_page - 1) + ',20;'
            let _list = await mysqls.query(_sql, v)
            this.response.status = 200
            this.body = Callback({
                data: _list
            })
        } else {
            this.response.status = 416
            this.body = {
                code: 416,
                msg: '页码必须传'
            }
        }
    }
}

module.exports = projectController