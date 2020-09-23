const fs = require("fs");
const { resolve } = require("path");
const { isEmpty } = require('lodash');
const { gql } = require('apollo-server');
const defaultPath = resolve(__dirname, "../components/");
const typeDefFileName = "schema.js";
const resolverFileName = "resolver.js";

const allCustomScalars = require('./scalars/index');

function generateTypeDefsAndResolvers() {
    const typeDefs = []
  	const resolvers = []

	const _generateAllComponentRecursive = (path = defaultPath) => {
        const list = fs.readdirSync(path);
		list.forEach((item) => {
			const resolverPath = path + "/" + item;
			const stat = fs.statSync(resolverPath);
			const isDir = stat.isDirectory();
			const isFile = stat.isFile();
			if (isDir) {
				_generateAllComponentRecursive(resolverPath);
			} else if (isFile && item === typeDefFileName) {
				const schema = require(resolverPath)
        		typeDefs.push(schema)
			} else if (isFile && item === resolverFileName) {
				const resolversPerFile = require(resolverPath);
				resolvers.push(resolversPerFile);
            }
        });
	};

	_generateAllComponentRecursive();
	return { typeDefs, resolvers }
}

module.exports = { ...generateTypeDefsAndResolvers() };
