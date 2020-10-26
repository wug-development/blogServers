/**
├── schema
└── t_projectsSchema.js
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('t_projects', {
        dcProjectID: {
            type: DataTypes.STRING,
            field: 'dcProjectID',
            allowNull: false,
            Comment: '项目ID',
            primaryKey: true,
        },
        dcProjectTitle: {
            type: DataTypes.STRING,
            field: 'dcProjectTitle',
            allowNull: false,
            Comment: '项目标题',
        },
        dcProjectImg: {
            type: DataTypes.STRING,
            field: 'dcProjectImg',
            allowNull: false,
            Comment: '项目图片',
        },
        dcBrief: {
            type: DataTypes.STRING,
            field: 'dcBrief',
            allowNull: false,
            Comment: '项目简介',
        },
        dcSkill: {
            type: DataTypes.STRING,
            field: 'dcSkill',
            allowNull: false,
            Comment: '项目技术',
        },
        dcContent: {
            type: DataTypes.TEXT,
            field: 'dcContent',
            allowNull: true,
            Comment: '项目内容',
        },
        dcProjectSDate: {
            type: DataTypes.STRING,
            field: 'dcProjectSDate',
            allowNull: false,
            Comment: '项目开始日期',
        },
        dcProjectEDate: {
            type: DataTypes.STRING,
            field: 'dcProjectEDate',
            allowNull: false,
            Comment: '项目结束日期',
        },
        dtCreatedDate: {
            type: DataTypes.DATE,
            field: 'dtCreatedDate',
            allowNull: true,
            Comment: '创建时间',
            get: () => { return moment(this.getDataValue('dtCreatedDate')).format('YYYY-MM-DD HH:mm:ss'); },
        },
        dtUpdatedDate: {
            type: DataTypes.DATE,
            field: 'dtUpdatedDate',
            allowNull: true,
            Comment: '更新时间',
            get: () => { return moment(this.getDataValue('dtUpdatedDate')).format('YYYY-MM-DD HH:mm:ss'); },
        },
    }, {
        timestamps: false
    })
}