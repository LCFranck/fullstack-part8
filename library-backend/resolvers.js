
const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

//obs kom ihåg await!!!!!!!!!
const resolvers = {
  Author: {
    bookCount: async (root) => {
      return await Book.collection.countDocuments({ author: root._id }) //(book => book.author === root.name).length
          },
  },
  Query: {
		me: (root, args, context) => {//OBS context kom ihåg
      return context.currentUser
    },
    bookCount : async() =>await Book.collection.countDocuments(),
    authorCount : async() => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
			console.log(args.author)
     	if (args.author) {
				const author = await Author.findOne({ name: args.author })
				return Book.find({ author: author._id })
			}
    
      if (args.genre){
        console.log(args.genre)
        return await Book.find({ genres: args.genre}) //obs fixa dehä
      }
       return Book.find({}).populate('author')
        
      },
      
      allAuthors: async () => {

      	return Author.find({})

  },
    findBook: async (root, args) => {
			return await Book.find({title: args.name})
     // books.find(p => p.name === args.name),
  }

},
   Mutation: {
    addBook: async (root, args, { currentUser }) => {
    if (!currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' },
      })
    }
      const titleExists = await Book.exists({ title: args.title })
      const authorExists = await Author.exists({ name: args.author })


      if (titleExists) {
        throw new GraphQLError(`Title must be unique: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        })
      }
			if (!authorExists) {
				const author = await new Author({name: args.author, bookCount:1})
				      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      }
			
			const author = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: author })
            try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return book
    },
      editAuthor: async (root, args, { currentUser }) => {
    if (!currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' },
      })
    }
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(`Saving number failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      return author
    } ,
	createUser: async (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

    return user.save()
      .catch(error => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })        
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
  },
	 _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode')
      }
      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})
      return true
    },
    }
  
}

  module.exports = resolvers