import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [foo, setFoo] = useState('N/A');

  useEffect(() => {
    fetch('http://localhost:5000/api')
        .then((res) => res.json())
        .then((data) => setFoo(data.foo))
        .catch((err) => setFoo(err.message));
  }, [])

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <h3>Server responded with foo:{foo}</h3> 
      </div>
    </div>
  )
}

export default App
