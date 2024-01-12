
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import RegistrationForm from './components/Form'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/registration' element={<RegistrationForm/>}></Route>
      </Routes>
    </>
  )
}

export default App
