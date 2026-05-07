const typeDefs = /* GraphQL */ ` 

  type Author {
      name: String!
      born: Int
      bookCount: Int!
      id: ID!
    }
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
    value: String!
    }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
}
  type Mutation {
		_resetDatabase: Boolean
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]
		): Book
		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
		createUser(
			username: String!
			favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
    }
  type Query {
		me: User
		bookCount: Int!
		authorCount: Int!
		allAuthors: [Author!]!
		allBooks(author: String, genre: String): [Book!]!
		findAuthor(name: String!): Author
		findBook(name: String!): Book
}
`
module.exports = typeDefs