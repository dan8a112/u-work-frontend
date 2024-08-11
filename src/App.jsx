import { Route, Routes, useLocation } from 'react-router-dom'
import { UserRegister } from './components/views/Register/UserRegister'
import { Login } from './components/views/Login'
import { Home } from './components/views/Home'
import { BussinesRegister } from './components/views/Register/BusinessRegister'
import { UserProfile } from './components/views/UserProfile'
import { OffersDetail } from './components/views/OffersDetail'
import HeaderHome from './components/headers/HeaderHome'
import { Application } from './components/views/Applications'
import NotificationDetail from './components/cards/Notification/NotificationDetail'
import { StatsCard } from './components/cards/StatsCard'
import { Typography } from '@mui/material'
import { ImageTextCard } from './components/cards/ImageTextCard'
import OutlinedCard from './components/cards/OfertaCard'
import { OfertaEnterpriseCard } from './components/cards/OfertaEnterpriseCard'
import { HomeEnterprise } from './components/views/HomeEnterprise'
import HeaderEnterprise from './components/headers/HeaderEnterprise'
import { EnterpriseProfile } from './components/views/EnterpriseProfile'
import { CreateOffer } from './components/views/CreateOffer'
import { OffersDetailEnterprise } from './components/views/OffersDetailEnterprise'
import { OffersEnterprise } from './components/views/OffersEnterprise'

function App() {

  const location = useLocation();
  const showTabbarRoutes = ["/home", "/userProfile", "/application", "/offersDetail"];
  const showTabbarEnterpriseRoutes = ["/homeEnterprise", "/EnterpriseProfile", "/OffersEnterprise"];

  return (
    <>
    {showTabbarRoutes.includes(location.pathname) && <HeaderHome />}
    {showTabbarEnterpriseRoutes.includes(location.pathname) && <HeaderEnterprise />}
      <Routes>
        <Route path='/register' element={<UserRegister/>}></Route>
        <Route path='/registerBussiness' element={<BussinesRegister/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/userProfile' element={<UserProfile/>}></Route>
        <Route path='/offersDetail' element={<OffersDetail/>}></Route>
        <Route path='/application' element={<Application/>}></Route>
        <Route path='/homeEnterprise' element={<HomeEnterprise></HomeEnterprise>}></Route>
        <Route path='/EnterpriseProfile' element={<EnterpriseProfile />}></Route>
        <Route path='/createOffer' element={<CreateOffer></CreateOffer>}></Route>
        <Route path='/offersDetailEnterprise' element={<OffersDetailEnterprise></OffersDetailEnterprise>}></Route>
        <Route path='/OffersEnterprise' element={<OffersEnterprise />}></Route>
      </Routes>
    </>
  )
}

export default App
