import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {ALL_AUTHORS, ALL_BOOKS, FIND_AUTHOR} from './queries'
import { useApolloClient, useQuery } from '@apollo/client/react'


const App = () => {
  const [page, setPage] = useState('authors')

  const authorResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
    const [token, setToken] = useState(
      localStorage.getItem('library-user-token'),
    )
    const client = useApolloClient()
     
  

  if (authorResult.loading ||  booksResult.loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => {console.log(token) 
          setPage('authors')}}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        <button onClick={() => setPage('login')}>Login</button>
      </div>

      <Authors show={page === 'authors'} token={token} authors={authorResult.data.allAuthors} />

      <Books show={page === 'books'} books={booksResult.data.allBooks}  />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} > </LoginForm>

    </div>
  )
}

export default App
