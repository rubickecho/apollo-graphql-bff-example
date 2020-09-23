const fs = require("fs");
const { resolve } = require("path");
const { isEmpty } = require('lodash');
const defaultPath = resolve(__dirname, "../components/");
const typeDefFileName = "schema.js";
const resolverFileName = "resolver.js";

function generateTypeDefsAndResolvers() {
    let generateList = [];

	const _generateAllComponentRecursive = (path = defaultPath) => {
        const list = fs.readdirSync(path);
        let typeDefs = {};
        let resolvers = {};
		list.forEach((item) => {
			const resolverPath = path + "/" + item;
			const stat = fs.statSync(resolverPath);
			const isDir = stat.isDirectory();
			const isFile = stat.isFile();
			if (isDir) {
				_generateAllComponentRecursive(resolverPath);
			} else if (isFile && item === typeDefFileName) {
				typeDefs = require(resolverPath);
			} else if (isFile && item === resolverFileName) {
				const resolversPerFile = require(resolverPath);
				Object.keys(resolversPerFile).forEach((k) => {
					if (!resolvers[k]) resolvers[k] = {};
					resolvers[k] = { ...resolvers[k], ...resolversPerFile[k] };
				});
            }
        });
        
        if (!isEmpty(typeDefs) && !isEmpty(resolvers)) {
            generateList.push({typeDefs, resolvers})
        }
	};

	_generateAllComponentRecursive();

	return generateList;
}

module.exports = generateTypeDefsAndResolvers();
