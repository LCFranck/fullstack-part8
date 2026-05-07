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
      author
      id
      published
      title
    }
  }
`


export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
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
      author
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

