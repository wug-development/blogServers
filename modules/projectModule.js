/**
├── modules
    └── project.js
*/

// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Project = Sequelize.import('../schema/projectSchema');
// 自动创建表
// Project.sync({force: false});

class ProjectModel {
    /**
     * 查询取项目详情数据
     * @param id  项目ID
     * @returns {Promise<Model>}
     */
    static async getProjectDetail(id) {
        return await Project.findOne({
            where: {
                'dcProjectID': id,
            },
        })
    }

    /**
     * 删除项目数据
     * @param id  项目ID
     * @returns {Promise<Model>}
     */
    static async deleteProject(id) {
        return await Project.destroy({
            where: {
                'dcProjectID': id,
            },
        })
    }
}

module.exports = ProjectModel