import { Route, Routes, useLocation } from 'react-router-dom'
import { UserRegister } from './components/views/Register/UserRegister'
import { Login } from './components/views/Login'
import { Home } from './components/views/Home'
import { BussinesRegister } from './components/views/Register/BusinessRegister'
import { UserProfile } from './components/views/UserProfile'
import HeaderHome from './components/headers/HeaderHome'
import { Application } from './components/views/Applications'

function App() {

  const location = useLocation();
  const showTabbarRoutes = ["/home", "/userProfile", "/application"];

  return (
    <>
    {showTabbarRoutes.includes(location.pathname) && <HeaderHome />}
      <Routes>
        <Route path='/register' element={<UserRegister/>}></Route>
        <Route path='/registerBussiness' element={<BussinesRegister/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/userProfile' element={<UserProfile/>}></Route>
        <Route path='/application' element={<Application/>}></Route>
      </Routes>
    </>
  )
}

export default App
