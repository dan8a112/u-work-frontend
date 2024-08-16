import { Route, Routes, useLocation } from 'react-router-dom'
import { UserRegister } from './components/views/Register/UserRegister'
import { Login } from './components/views/Login'
import { BussinesRegister } from './components/views/Register/BusinessRegister'
import { UserProfile } from './components/views/UserProfile'
import { OffersDetail } from './components/views/OffersDetail'
import HeaderHome from './components/headers/HeaderHome'
import { Application } from './components/views/Applications'
import { HomeEnterprise } from './components/views/HomeEnterprise'
import HeaderEnterprise from './components/headers/HeaderEnterprise'
import { EnterpriseProfile } from './components/views/EnterpriseProfile'
import { CreateOffer } from './components/views/CreateOffer'
import { OffersDetailEnterprise } from './components/views/OffersDetailEnterprise'
import { OffersEnterprise } from './components/views/OffersEnterprise'
import { OfferApplicants } from './components/views/OfferApplicants'
import { Test } from './components/views/Test'
import { HomeAdmin } from './components/views/HomeAdmin'
import HeaderAdmin from './components/headers/HeaderAdmin'
import { HomeUser } from './components/views/Home'

function App() {

  const location = useLocation();
  const showTabbarRoutes = ["/home", "/userProfile", "/application", "/offersDetail"];
  const showTabbarEnterpriseRoutes = ["/homeEnterprise", "/EnterpriseProfile", "/OffersEnterprise", "/offersDetailEnterprise", "/Applicants"];
  const showTabbarAdmin = ["/homeAdmin"];


  return (
    <>
    {showTabbarRoutes.includes(location.pathname) && <HeaderHome />}
    {showTabbarEnterpriseRoutes.includes(location.pathname) && <HeaderEnterprise />}
    {showTabbarAdmin.includes(location.pathname) && <HeaderAdmin />}

      <Routes>
        <Route path='/register' element={<UserRegister/>}></Route>
        <Route path='/registerBussiness' element={<BussinesRegister/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<HomeUser/>}></Route>
        <Route path='/userProfile' element={<UserProfile from="user"/>}></Route>
        <Route path='/offersDetail/:offerId' element={<OffersDetail/>}></Route>
        <Route path='/application' element={<Application/>}></Route>
        <Route path='/homeEnterprise' element={<HomeEnterprise></HomeEnterprise>}></Route>
        <Route path='/EnterpriseProfile' element={<EnterpriseProfile />}></Route>
        <Route path='/createOffer' element={<CreateOffer></CreateOffer>}></Route>
        <Route path='/offersDetailEnterprise' element={<OffersDetailEnterprise></OffersDetailEnterprise>}></Route>
        <Route path='/OffersEnterprise' element={<OffersEnterprise />}></Route>
        <Route path='/Applicants' element={<OfferApplicants></OfferApplicants>}></Route>
        <Route path='/selectUserEnterprise' element={<UserProfile from="enterprise" action="select"></UserProfile>}></Route>
        <Route path='/watchUserEnterprise' element={<UserProfile from="enterprise"></UserProfile>}></Route>
        <Route path='/homeAdmin' element={<HomeAdmin></HomeAdmin>}></Route>
      </Routes>
    </>
  )
}

export default App
