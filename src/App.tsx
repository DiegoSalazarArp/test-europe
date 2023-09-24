import './App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { UserList } from './components/UserList'
import { SortBy, type User } from './types.d'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filteredCountries, setFilteredCountries] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])
  // useRef =>  para guardar el valor
  // que queremos que se comparta entre renderes
  // pero que al cambiar, no dispare un nuevo render

  const toggleColor = () => {
    setShowColor(!showColor)
  }

  const toggleByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => {
      return user.email !== email
    })
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => { console.log(err) })
  }, [])

  const filteredUsers = useMemo(() => {
    return typeof filteredCountries === 'string' && filteredCountries.length > 0
      ? users.filter((user) => {
        return user.location.country.toLowerCase().includes(filteredCountries.toLowerCase())
      })
      : users
  }, [filteredCountries, users])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    }

    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    }

    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    }
  }, [filteredUsers, sorting])

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  return (
    <>
      <div>
        <h1>Test</h1>
        <header>
          <button onClick={toggleColor}>Colorear filas </button>
          <button onClick={toggleByCountry}>{sorting === SortBy.NONE ? 'No ordenar por pais' : 'Ordenar'}</button>
          <button onClick={handleReset}>Reset</button>
          <input placeholder='Country' type="text" onChange={(e) => { setFilteredCountries(e.target.value) }} />
        </header>

        <main>
          <UserList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColor} users={sortedUsers} />
        </main>
      </div>

    </>
  )
}

export default App
