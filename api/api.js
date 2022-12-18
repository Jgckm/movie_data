const axios = require('axios')
const Mysql = require('../utils/sql')
const http_config = require('../config/http_config')


const TYPE_ID = http_config.type_id
/**
 * 第一次全部获取模块
 *
 */


const sql = new Mysql()


async function main() {
    if (!http_config.chooseTypeName(http_config.type_id)) {
        return
    }
    await axios.get(`https://www.feisuzyapi.com/api.php/provide/vod/from/fsm3u8/?ac=detail&t=${TYPE_ID}&pg=1`).then((data) => {
        console.log(data.data.pagecount)
        if (data.data.pagecount === 0) {
            console.log('没有数据')
            close_sql()
            return
        }
        getData(data.data.pagecount)
    }).catch(reason => {
        console.log('请求发生出错误！----》', i + '\n' + reason)
    })
}


async function getData(page) {
    for (let i = 1; i <= page; i++) {
        await axios.get(`https://www.feisuzyapi.com/api.php/provide/vod/from/fsm3u8/?ac=detail&t=${TYPE_ID}&pg=${i}`).then((data) => {
            let data_list = data.data.list
            data_list.forEach(item => {
                addData(item)
            })
        }).catch(reason => {
            console.log('请求发生出错误！----》', i + '\n' + reason)
        })
        if (i === page) {
            // console.log('爬取完毕')
            // sql.close()
            setTimeout(close_sql, 2000)
            break
        }
    }
}


/**
 *
 * @param selData 单个查询对象
 */
function addData(selData) {
    sql.selectdata(selData, function (result, data) {
        // 如果没有查询到数据就插入
        if (result.length === 0) {
            sql.insertData(data)
        } else {
            // 查询到数据后判断是否要更新数据
            result.forEach(item => {
                // 判断视频链接是否相同 不相同就更新数据
                if (item.vod_play_url !== data.vod_play_url) {
                    sql.updata(data)
                    // console.log('已更新', data.vod_name)
                } else {
                    console.log('无需更新', data.vod_name)
                }
            })
        }
    })
}


function close_sql() {
    sql.close()
    console.log('更新完毕')
}


module.exports = {
    main,
    addData,
    close_sql
}