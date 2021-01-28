/**
├── schema
└── t_labelsSchema.js
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('t_labels', {
        dnLabelID: {
            type: DataTypes.INTEGER,
            field: 'dnLabelID',
            allowNull: false,
            Comment: '标签ID',
            primaryKey: true,
        },
        dcLabelName: {
            type: DataTypes.STRING,
            field: 'dcLabelName',
            allowNull: false,
            Comment: '标签',
        },
        dcCategoryID: {
            type: DataTypes.STRING,
            field: 'dcCategoryID',
            allowNull: false,
            Comment: '文章分类ID',
        },
        dcAddTime: {
            type: DataTypes.DATE,
            field: 'dcAddTime',
            allowNull: false,
            Comment: '添加时间',
            get: function () { let _d = this.getDataValue('dcAddTime'); return (_d ? moment(_d).format('YYYY-MM-DD HH:mm:ss') : ''); },
        },
    }, {
        timestamps: false, // 去除createAt updateAt
        freezeTableName: true, // 使用自定义表名
        // deletedAt: false
        // 删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
        // paranoid: false
    })
}