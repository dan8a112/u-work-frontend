import { Route, Routes } from 'react-router-dom'
import { Register } from './components/views/Register/Register'
import { Login } from './components/views/Login'
import { Home } from './components/views/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default App
