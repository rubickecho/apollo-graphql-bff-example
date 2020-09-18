let fs = require("fs");
let { keys } = Object;

let files = fs.readdirSync(__dirname + "/data");
let dataConfig = {};

files.forEach((file) => {
	if (file.indexOf(".js") > 0) {
		let obj = require(`./data/${file}`);
		for (let key of keys(obj)) {
			dataConfig[key] = obj[key];
		}
	}
});

module.exports = function () {
	return dataConfig;
};
