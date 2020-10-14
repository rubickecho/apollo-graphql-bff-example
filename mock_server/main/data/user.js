const Mock = require('mockjs')

module.exports = {
    // user: Mock.mock({
    //     "status": 200,
    //     "msg": "",
    //     data: {
    //         id: 1,
    //         title: '张三',
    //         status: 1,
    //         age: 18,
    //         created_time: "@date()"
    //     }
    // }),
    user: Mock.mock({
        "status": 500,
        "msg": "服务器错误",
        data: {}
    }),
    users: Mock.mock({
        status: 200,
        msg: "",
        data: [{
            id: 1,
            title: '张三',
            status: 1,
            age: 18,
            created_time: "@date()"
        }, {
            id: 2,
            title: '李四',
            status: 2,
            age: 21,
            created_time: "@date()"
        }]
    })
}
