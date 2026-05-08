import {useState} from "react"


const Books = (props) => {
  const [filter, setFilter] = useState("all")
  if (!props.show) {
    return null
  }

  const books = props.books
  console.log(books)
  
if (!books){
  return <div> <h1> GONE </h1></div>
}

  const uniqueGenres = [
  ...new Set(
    books.flatMap(book => book.genres || [])
  )
]
  const filteredBooks =  () => {
    if(filter == "all"){
      return books
    }
    else return books.filter(book => book.genres.includes(filter))
  }


  console.log(uniqueGenres)
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks().map((a) => (
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
      <button onClick={() => setFilter("all")}>{"all"}</button>
    </div>
  )
}

export default Books
