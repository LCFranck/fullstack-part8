import {  useQuery } from '@apollo/client/react'

import {ALL_BOOKS, ME} from '../queries'
const Recommendations = (props) => {
  if (!props.show || !props.token) {
    return null
  }

  const user = useQuery(ME)

  const genre = user.data?.me?.favoriteGenre

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre
  })

  if (user.loading || booksResult.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <h3>books in your favorite genre </h3> <p>{genre}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks && booksResult.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
