const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-koa');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args) {
            const context = args[2]
            const token = context.token;

            if (!token) throw new AuthenticationError('Authentication Failure');
            return resolve.apply(this, args);
        }
    }
}

module.exports = {
    auth: AuthDirective
}