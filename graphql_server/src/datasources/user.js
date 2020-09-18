const { RESTDataSource } = require("apollo-datasource-rest");

class UserAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "http://localhost:3000/";
	}
	async getUser() {
		const response = await this.get("user");
		return this.userReducer(response.data);
	}

	userReducer(user) {
		return {
			id: user.id,
			title: user.title,
		};
	}

	async getAllUser() {
		const response = await this.get("users");
		return response.data
	}

	async findUser(id) {
		const response = await this.get("users");
		const list = Array.isArray(response.data) ? response.data : []
		let user;
		list.forEach(item => {
			if (item.id === Number(id)) user = item;
		});
		return user;
	}
}

module.exports = UserAPI;
