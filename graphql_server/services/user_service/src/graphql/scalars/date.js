const dayjs = require('dayjs');
const { Kind } = require('graphql/language');
const { GraphQLScalarType } = require('graphql');

/**
 * Ast 抽象语法树
 * Reference: https://zh.wikipedia.org/wiki/%E6%8A%BD%E8%B1%A1%E8%AA%9E%E6%B3%95%E6%A8%B9
 */
const customScalarDate = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: value => dayjs(value).valueOf(),
    serialize: value => dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    parseLiteral: ast => (ast.kind === Kind.INT) ? parseInt(ast.value, 10) : null
});

module.exports = { Date: customScalarDate };