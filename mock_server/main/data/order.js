const Mock = require('mockjs')

module.exports = {
    order: Mock.mock({
        "status": 200,
        "msg": "",
        "data": {
            "id|1-10": 10,
            "orderNo": '@date("yyyyMMdd")@time("HHmmss")',
            "amount|1-999": 100
        }
    })
}
