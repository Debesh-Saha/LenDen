import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/Dashboard';
import { Signup } from './pages/Signup';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
