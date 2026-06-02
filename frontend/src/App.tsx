import './App.css'
import { Appbar } from './components/Appbar'
import { Balance } from './components/Balance'

function App() {


  return (
    <>
      <Appbar />
      <Balance value={100000} />
    </>
  )
}

export default App
