import {useState} from "react"
import {ALL_BOOKS} from '../queries'
import { useQuery } from '@apollo/client/react'


const Books = (props) => {
  const [filter, setFilter] = useState("")
  //could make the backend have a query for all genres, which would be better but this is an easuier solution for this assignment
  const allBooksResults = useQuery(ALL_BOOKS, {})
  const booksResult = useQuery(ALL_BOOKS, {variables:{genre: filter}})


  if (booksResult.loading || allBooksResults.loading){
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks
  console.log(books)
  
  if (!props.show) {
    return null
  }

  const uniqueGenres = [
    ...new Set(
      allBooksResults.data.allBooks.flatMap(book => book.genres || [])
    )
  ]

  console.log(uniqueGenres)
  return (
    <div>
      <h2>books</h2>
      <h3>in genre {filter}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map((g) => (
        <button onClick={() => setFilter(g)} key={g}>{g}</button>
      ))}
      <button onClick={() => setFilter("")} >all genres</button>
    </div>
  )
}

export default Books
