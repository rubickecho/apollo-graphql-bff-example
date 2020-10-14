<template>
	<div class="apollo-example">
		<ApolloQuery :query="require('../graphql/Users.gql')">
			<template slot-scope="{ result: { data } }">
				<div>用户数量: {{ data.users.length }}</div>
				<ul>
					<li v-for="user of data.users" :key="user.id" class="user">
						{{ user.title }}-{{ user.status }}
						<div style="padding-left: 16px; font-size: 14px">
							<ul>
								<li
									v-for="(book, index) of user.books"
									:key="user.title + index"
									class="book"
								>
									{{ book.title }} - ¥{{ book.price }}
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</template>
		</ApolloQuery>
		{{ queryUser.title }}
	</div>
</template>

<script>
import gql from 'graphql-tag'
export default {
	// apollo: {
  //   queryUser: {
  //     query: gql`query {
  //       user {
  //         id
  //         title 
  //         }
  //     }`,
  //     error (error, vm, key, type, options) {
  //       console.log('We\'ve got an error!', error)
  //       this.$message.info('We\'ve got an error!', error);
  //     },
  //   }
	// },
	data() {
		return {
			queryUser: {}
		}
	},
  mounted() {
    this.$apollo.query({
      query: gql`query {
        user {
          id
          title 
          }
      }`
    }).then(({ data }) => {
      this.queryUser = data.user;
    }).catch(({ graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)
      graphQLErrors.forEach(error => {
        this.$message.info(error.message, 5);
      });
    });
  }
}
</script>

