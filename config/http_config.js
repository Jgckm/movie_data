module.exports = {
    type_id:26, // 影视类型 26 为日本动漫
//    默认只可以更新这一个属性
    chooseTypeName
}

const typelist = [{
    "type_id": 1,

    "type_name": "电影"
},
    {
        "type_id": 2,

        "type_name": "电视剧"
    },
    {
        "type_id": 3,

        "type_name": "综艺"
    },
    {
        "type_id": 4,

        "type_name": "动漫"
    },
    {
        "type_id": 6,

        "type_name": "动作片"
    },
    {
        "type_id": 7,

        "type_name": "喜剧片"
    },
    {
        "type_id": 8,

        "type_name": "爱情片"
    },
    {
        "type_id": 9,

        "type_name": "科幻片"
    },
    {
        "type_id": 10,

        "type_name": "恐怖片"
    },
    {
        "type_id": 11,

        "type_name": "剧情片"
    },
    {
        "type_id": 12,

        "type_name": "战争片"
    },
    {
        "type_id": 13,

        "type_name": "国产剧"
    },
    {
        "type_id": 14,

        "type_name": "香港剧"
    },
    {
        "type_id": 15,

        "type_name": "台湾剧"
    },
    {
        "type_id": 16,

        "type_name": "韩国剧"
    },
    {
        "type_id": 20,

        "type_name": "纪录片"
    },
    {
        "type_id": 21,

        "type_name": "动画片"
    },
    {
        "type_id": 22,

        "type_name": "日本剧"
    },
    {
        "type_id": 23,

        "type_name": "泰国剧"
    },
    {
        "type_id": 24,

        "type_name": "欧美剧"
    },
    {
        "type_id": 25,

        "type_name": "国产动漫"
    },
    {
        "type_id": 26,

        "type_name": "日本动漫"
    },
    {
        "type_id": 27,

        "type_name": "欧美动漫"
    },
    {
        "type_id": 28,

        "type_name": "海外动漫"
    },
    {
        "type_id": 29,

        "type_name": "电影解说"
    },
    {
        "type_id": 30,

        "type_name": "大陆综艺"
    },
    {
        "type_id": 31,

        "type_name": "港台综艺"
    },
    {
        "type_id": 32,

        "type_name": "韩国综艺"
    },
    {
        "type_id": 33,

        "type_name": "欧美综艺"
    },
    {
        "type_id": 35,

        "type_name": "其他片"
    },
    {
        "type_id": 36,

        "type_name": "其他剧"
    }]

function chooseTypeName(id) {
    if (id<1 || id>36 ){
        console.log('请填写正确的 type_id')
        return false
    }
    const type_name =  typelist.filter(item=> item.type_id === id)[0].type_name
    return type_name
}