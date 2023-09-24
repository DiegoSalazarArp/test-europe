import { SortBy, type User } from '../types.d'

interface UserListProps {
  showColors: boolean
  users: User[] | undefined
  deleteUser: (email: string) => void
  changeSorting: (sort: SortBy) => void
}

export function UserList ({ changeSorting, deleteUser, showColors, users }: UserListProps) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
          <th onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
          <th onClick={() => { changeSorting(SortBy.COUNTRY) }}>Pais</th>
          <th>Acciones</th>

        </tr>
      </thead>
      <tbody>
        {
          users?.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? backgroundColor : 'transparent'
            return (
              // cambiar
              <tr key={user.email} style={{ background: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>
                  {user.name.first}
                </td>
                <td>
                  {user.name.last}
                </td>
                <td>
                  {user.location.country}
                </td>
                <td>
                  <button onClick={() => { deleteUser(user.email) }}>Borrar</button>
                </td>
              </tr>
            )
          }
          )
      }

      </tbody>
    </table>
  )
}
