const axios = require('axios')
const { addData, close_sql } = require('../api/api')
const { type_id} = require('../config/http_config')

/**
 * 每日更新模块
 */

// getupdate()

/**
 * 获取今日更新数据
 */
function getupdate() {
    // h = 24 获取24小时内的更新数据
    axios.get(`https://www.feisuzyapi.com/api.php/provide/vod/from/fsm3u8/?ac=detail&t=${type_id}&h=24`).then(data =>{
        // 判断是否是多页
        if (data.data.pagecount > 1){
            // 多页情况时
            pagesData(data.data.pagecount)
        }else{
            // 不是多页直接处理数据
            data.data.list.forEach(item => {
                addData(item)
            })
            setTimeout(close_sql,2000)

        }
    }).catch(reason => console.log('请求发生错误！\n',reason))

}


/**
 * 多页情况
 * @param page 更新页数
 */
async function pagesData(page){
    console.log(page)
    for (let i = 1; i <= page; i++) {
        await axios.get(`https://www.feisuzyapi.com/api.php/provide/vod/from/fsm3u8/?ac=detail&t=${type_id}&h=24&pg=${i}`).then((data) => {
            let data_list = data.data.list
            data_list.forEach(item => {
                addData(item)
            })
        }).catch(reason =>{
            console.log('请求发生出错误！----》', i + '\n' + reason)
        })
        if (i === page){
            // 关闭与数据库的连接
            setTimeout(close_sql,2000)
            break
        }
    }
}

module.exports = {
    getupdate
}