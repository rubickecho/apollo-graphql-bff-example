const { RESTDataSource } = require("apollo-datasource-rest");
const {
	ApolloError,
  } = require('apollo-server');
class UserAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "http://localhost:3000/";
	}
	willSendRequest(request) {
		request.headers.set('Authorization', this.context.token);
	}

	async getUser() {
		const response = await this.get("user");
		console.log('response', response)
		if (response.status === 200) {
			return this.userReducer(response.data);
		} else {
			throw new ApolloError(JSON.stringify(response));
			// throw new ApolloError(response);
		}
	}

	userReducer(user) {
		return {
			id: user.id,
			title: user.title,
		};
	}

	async getAllUser() {
		const response = await this.get("users");
		if (response.status === 200) {
			return response.data
		} else {
			throw new ApolloError(response.message);
		}
		// return response.data
	}

	async fetchUserById(id) {
		const response = await this.get("users");
		const list = Array.isArray(response.data) ? response.data : []
		let user;
		list.forEach(item => {
			if (item.id === Number(id)) user = item;
		});

		return user;
	}

	async getUserBooks(uid) {
		const response = await this.get("users");
		const list = Array.isArray(response.data) ? response.data : []
		let user;
		list.forEach(item => {
			if (item.id === Number(uid)) user = item;
		});

		if (user) {
			const booksRes = await this.get("books");
			let books = [];
			booksRes.data.forEach((book) => {
				if (book.userId === user.id) books.push(book)
			})
			user.books = books;
		}
		return user;
	}
}

module.exports = UserAPI;
