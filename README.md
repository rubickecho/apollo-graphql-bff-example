# apollo-graphql-bff-example
Apollo Graphql BFF方案探索学习; 

目的连接其他API服务，聚合接口、逻辑，返回对前端友好的数据结构。

## Getting Started

**mock server: localhost:3000**
```
> cd mock_server
> npm install #or yarn
> npm run mock
```

**apollo gateway: localhost:4000**
```
> cd graphql_server
> npm install #or yarn
> npm run start-gateway
```

**start services**
```
> cd graphql_server
> npm run start-services
```

## Features

* [x] 基础数据返回
* [x] 从其他API服务端获取数据
* [x] gateway
* [x] Apollo Federation: entities
* [x] 设置请求头
* [x] 自定义标量
* [x] 自定义指令
* [ ] 错误处理
* [ ] 日志
* [ ] 缓存
* [ ] 同步Client端redux数据
* [ ] 环境变量管理