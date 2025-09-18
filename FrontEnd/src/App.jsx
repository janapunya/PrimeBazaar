import { useState } from 'react'
import Routes from "./routes/Routes"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className=' bg-zinc-200 '>
      <Routes/>
      </div>
    </>
  )
}

export default App
