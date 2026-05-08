import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
 ` 
 
export const ALL_BOOKS = gql`
query {
    allBooks {
      author{
        name
        bookCount
        id
      }
      id
      published
      title
      genres
    }
  }
`

export const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      name
      born
      bookcount
      id
    }
  }
`


export const CREATE_BOOK = gql`
  mutation createBook(
    $author: String!
    $published: Int
    $title: String!
    $genres: [String!]!
  ) {
    addBook(author: $author, published: $published, title: $title, genres: $genres) {
      author{
        name
        id
        bookCount
        born
      }
      id
      published
      title  
      genres
    }
  }
`
export const CHANGE_BORN = gql` 
    mutation changeBorn(
        $name: String!
        $setBornTo: Int!
    ){
    editAuthor(name: $name, setBornTo: $setBornTo){
        name
        born
    }
    }
`

//nytt

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`