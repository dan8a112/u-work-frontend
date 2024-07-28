import { Route, Routes } from 'react-router-dom'
import { UserRegister } from './components/views/Register/UserRegister'
import { Login } from './components/views/Login'
import { Home } from './components/views/Home'
import { BussinesRegister } from './components/views/Register/BusinessRegister'
import { UserProfile } from './components/views/UserProfile'

function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element={<UserRegister/>}></Route>
        <Route path='/registerBussiness' element={<BussinesRegister/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/userProfile' element={<UserProfile/>}></Route>
      </Routes>
    </>
  )
}

export default App
