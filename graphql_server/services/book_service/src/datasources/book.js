const { RESTDataSource } = require("apollo-datasource-rest");

class BookAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "http://localhost:3000/";
	}
	willSendRequest(request) {
		request.headers.set('Authorization', this.context.token);
	}

	async fetchAllBook() {
		const response = await this.get("books");
		return response.data;
	}

	async fetchUserBooks(id) {
		const response = await this.get("books");
		let list = []
		response.data.forEach(book => {
			if (book.userId == id) {
				list.push(book);
			}
		});
		return list;
	}
}

module.exports = BookAPI;
