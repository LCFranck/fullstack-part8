import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {ALL_AUTHORS, ALL_BOOKS, FIND_AUTHOR, ME} from './queries'
import {  useQuery } from '@apollo/client/react'
import Recommendations from './components/Recommendations'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(
      localStorage.getItem('library-user-token'),
    )
  
  const authorResult = useQuery(ALL_AUTHORS)

  const logout = () => {
    localStorage.removeItem('library-user-token')
    setToken(null)
    setPage('authors')
  
  }
  
  if (authorResult.loading){
    return <div>loading...</div>
  }

  const authors = authorResult.data.allAuthors
    console.log(token, "token!")


  return (
    <div>
      <div>
        <button onClick={() => {console.log(token) 
          setPage('authors')}}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token &&<button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={() => setPage('Recommendations')}>Recommendations</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors show={page === 'authors'} token={token} authors={authors} />

      <Books show={page === 'books'}   />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setPage={setPage} setToken={setToken} token={token}> </LoginForm>

      <Recommendations show={page === 'Recommendations'} token={token}/>

    </div>
  )
}

export default App
