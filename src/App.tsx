import './App.css'
import { useEffect, useState } from 'react'
import { UserList } from './components/UserList'

function App () {
  const [users, setUsers] = useState([])
  const [showColor, setShowColor] = useState(false)

  const toggleColor = () => {
    setShowColor(!showColor)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => { setUsers(res.results) })
      .catch(err => { console.log(err) })
  }, [])
  return (
    <>
      <div>
        <h1>Test</h1>
        <header>
          <button onClick={toggleColor}>Colorear filas </button>
        </header>
        <main>
          <UserList showColors={showColor} users={users} />
        </main>
      </div>

    </>
  )
}

export default App
