/**
├── schema
└── t_articlesSchema.js
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('t_articles', {
        dcArticleID: {
            type: DataTypes.STRING,
            field: 'dcArticleID',
            allowNull: false,
            Comment: '文章ID',
            primaryKey: true,
        },
        dcTitle: {
            type: DataTypes.STRING,
            field: 'dcTitle',
            allowNull: false,
            Comment: '文章标题',
        },
        dcBrief: {
            type: DataTypes.STRING,
            field: 'dcBrief',
            allowNull: false,
            Comment: '文章简介',
        },
        dcArticleImg: {
            type: DataTypes.STRING,
            field: 'dcArticleImg',
            allowNull: false,
            Comment: '文章图片',
        },
        dcAuthor: {
            type: DataTypes.STRING,
            field: 'dcAuthor',
            allowNull: false,
            Comment: '文章作者',
        },
        dcContent: {
            type: DataTypes.TEXT,
            field: 'dcContent',
            allowNull: false,
            Comment: '文章内容',
        },
        dcCategoryID: {
            type: DataTypes.STRING,
            field: 'dcCategoryID',
            allowNull: false,
            Comment: '文章分类ID',
        },
        dcCategoryName: {
            type: DataTypes.STRING,
            field: 'dcCategoryName',
            allowNull: false,
            Comment: '文章分类',
        },
        dnLookUpNum: {
            type: DataTypes.INTEGER,
            field: 'dnLookUpNum',
            allowNull: false,
            Comment: '查阅数量',
        },
        dnCommentNum: {
            type: DataTypes.INTEGER,
            field: 'dnCommentNum',
            allowNull: false,
            Comment: '评论数',
        },
        dnPraise: {
            type: DataTypes.INTEGER,
            field: 'dnPraise',
            allowNull: false,
            Comment: '赞',
        },
        dtCreatedAt: {
            type: DataTypes.DATE,
            field: 'dtCreatedAt',
            allowNull: false,
            Comment: '创建时间',
            get: function () { return moment(this.getDataValue('dtCreatedAt')).format('YYYY-MM-DD HH:mm:ss'); },
        },
        dtUpdatedAt: {
            type: DataTypes.DATE,
            field: 'dtUpdatedAt',
            allowNull: true,
            Comment: '更新时间',
            get: function () { let _d = this.getDataValue('dtUpdatedAt'); return (_d? moment(_d).format('YYYY-MM-DD HH:mm:ss') : ''); },
        },
    }, {
        timestamps: false
    })
}