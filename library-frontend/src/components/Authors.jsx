import {useState} from "react"
import {CHANGE_BORN, ALL_AUTHORS} from "../queries"
import { useMutation } from '@apollo/client/react'


const Authors = (props) => {
  const [author, setAuthor] = useState("Robert Martin")
  const [born, setBorn] = useState("")

  const [changeBorn] = useMutation(CHANGE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
 
 
  const submit = async (event) => {
    event.preventDefault()
 
    console.log( author, born) //obs kontrollera att number e int fö de e va de e i babckenden
    changeBorn({ variables: {name: author, setBornTo: Number(born)}}) 
    setBorn("")
     
  }

  if (!props.show) {
    return null
  }

  const authors = props.authors

  return (
    <div>
      <h1>authors</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token &&
      <form  onSubmit={submit}> 
        <h2>set birthyear  </h2>
        <select 
          name="name"
          value={author} 
          onChange={({ target }) => setAuthor(target.value)}>
          {authors.map((a) => (
            <option key={a.id} value={a.name}> {a.name}</option>
          ))}
        </select>
        <br/>
        <label  htmlFor="born">born</label>
        <input
          type="number"
          id="born"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type="submit">update author</button>
      </form>}
    </div>
  )
}

export default Authors
