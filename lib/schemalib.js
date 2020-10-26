const mysqls = require('./mysql')
const config = require('../config/default')

class Schema {
    /**
     * 获取所有表名
     * @returns list
     */
    static async getTables() {
        let _sql = "SELECT table_name FROM information_schema.tables WHERE table_schema=? AND table_type='base table';"
        let _list = await mysqls.query(_sql, config.database.DATABASE)
        return _list
    }

    /**
     * 获取表所有列名
     * @param tname
     * @returns list
     */
    static async getColumns (tname) {
        let _sql = "show full columns from " + config.database.DATABASE + "." + tname + ";"
        let _list = await mysqls.query(_sql, "")
        return Schema.getColumnsJson(_list)
    }

    static getColumnsJson (list) {
        let _json = {}
        for (let item of list) {
            _json[item.Field] = {
                type: Schema.getDataType(item.Type),
                field: "'" + item.Field + "'",
                allowNull: item.Null === 'YES',
                Comment: "'" + item.Comment + "'"
            }
            if (item.Type.indexOf('timestamp') > -1 || item.Type.indexOf('date') > -1) {
                _json[item.Field]['get'] = function () {
                    let _d = this.getDataValue('date');
                    return (_d? moment(_d).format('YYYY-MM-DD HH:mm:ss') : '');
                }
            }
            if (item.Key === 'PRI') {
                _json[item.Field]['primaryKey'] = true
            }
            if (item.Extra === 'auto_increment') {
                _json[item.Field]['autoIncrement'] = true
            }
        }
        return _json
    }

    static getDataType (v) {
        let _text = ''
        if (v.indexOf('int') > -1) {
            _text = 'DataTypes.INTEGER'
        } else if (v.indexOf('varchar') > -1) {
            _text = 'DataTypes.STRING'
        } else if (v.indexOf('timestamp') > -1 || v.indexOf('date') > -1) {
            _text = 'DataTypes.DATE'
        } else if (v.indexOf('text') > -1) {
            _text = 'DataTypes.TEXT'
        } else if (v.indexOf('real') > -1) {
            _text = 'DataTypes.REAL'
        } else if (v.indexOf('float') > -1) {
            _text = 'DataTypes.FLOAT'
        } else if (v.indexOf('double') > -1) {
            _text = 'DataTypes.DOUBLE'
        }
        return _text
    }
}

module.exports = Schema