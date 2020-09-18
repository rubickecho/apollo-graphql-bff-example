const { RESTDataSource } = require("apollo-datasource-rest");

class UserAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "http://localhost:3000/";
	}
	async getUser() {
		const response = await this.get("user");
		console.log('response:', response)
		return this.userReducer(response.data);
	}

	userReducer(user) {
		return {
			id: user.id,
			title: user.title,
		};
	}
}

module.exports = UserAPI;
