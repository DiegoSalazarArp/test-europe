import { type User } from '../types'

interface UserListProps {
  showColors: boolean
  users: User[]
}

export function UserList ({ showColors, users }: UserListProps) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Acciones</th>

        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? backgroundColor : 'transparent'
            return (
              // cambiar
              <tr key={index} style={{ background: color }}>
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
                  <button>Editar</button>
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
