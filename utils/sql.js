const sql = require('mysql')
const sql_config = require('../config/sql_config')
const {chooseTypeName, type_id} = require('../config/http_config')
const {createTable} = require("../createTable");


class Mysql {
    constructor() {
        this.db = sql.createConnection(sql_config)
        this.db.connect((err => {
            if (err) return console.log(err)
        }))
        this.tableName = chooseTypeName(type_id)
        this.db.query(createTable(this.tableName), (err, result) => {
            if (err) {
                console.log(`${this.tableName}表创建失败`,err.sqlMessage)
                return
            }
            console.log(`${this.tableName}表创建成功`)
        })
    }

    // 插入数据
    insertData(data) {
        const sql = `insert into ${this.tableName} set ?`
        this.db.query(sql, data, (err, result) => {
            if (err) return console.log(err.message);
            if (result.affectedRows === 1) {
                console.log('插入数据成功', data.vod_name);
            }
        })
    }

    // 更新数据
    updata(data) {
        const sql = `update ${this.tableName} set ? where vod_id=?`
        this.db.query(sql, [data, data.vod_id], (err, result) => {
            if (err) return console.log(err.message);
            if (result.affectedRows === 1) {
                console.log('更新数据成功', data.vod_name);
            }
        })
    }

    // 查询数据
    selectdata(vod_id, callback) {
        const sql = `select vod_id, vod_play_url
                     from ${this.tableName}
                     where vod_id = ?`
        this.db.query(sql, [vod_id.vod_id], (err, result) => {
            if (err) return console.log(err.message);
            callback && callback(result, vod_id)

        })
    }

    close() {
        this.db.end()
    }


}


module.exports = Mysql