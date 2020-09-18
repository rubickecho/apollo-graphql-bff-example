const Mock = require('mockjs')

module.exports = {
    books: {
        status: 200,
        msg: "",
        data: [{
            id: 1,
            title: '乔布斯传记',
            price: 99.99,
            userId: 1
        }, {
            id: 1,
            title: '鲁滨逊漂流记',
            price: 2.99,
            userId: 1
        }, {
            id: 1,
            title: 'JavaScript高级程序设计',
            price: 79,
            userId: 2
        }, {
            id: 1,
            title: '那个叫欧维的男人决定去死',
            price: 19.99,
            userId: 3
        }]
    }
}
