/**
├── schema
└── t_categorysSchema.js
*/
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('t_categorys', {
        dcCategoryID: {
            type: DataTypes.STRING,
            field: 'dcCategoryID',
            allowNull: false,
            Comment: '文章分类ID',
            primaryKey: true,
        },
        dcCategoryName: {
            type: DataTypes.STRING,
            field: 'dcCategoryName',
            allowNull: false,
            Comment: '文章分类',
        },
        dtCreateTime:{
            type:DataTypes.DATE,
            field:'dtCreateTime',
            allowNull:false,
            Comment:'添加时间',
            get:function () { let _d = this.getDataValue('dtCreateTime'); return (_d? moment(_d).format('YYYY-MM-DD HH:mm:ss') : ''); },
        }
    }, {
        timestamps: false, // 去除createAt updateAt
        freezeTableName: true, // 使用自定义表名
        // deletedAt: false
        // 删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
        // paranoid: false,
    })
}