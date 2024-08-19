import { Route, Routes, useLocation, matchPath, Navigate } from 'react-router-dom'
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
import { HomeAdmin } from './components/views/HomeAdmin'
import HeaderAdmin from './components/headers/HeaderAdmin'
import { HomeUser } from './components/views/Home'
import {LandingPage} from './components/views/LandingPage'
import { LoginCompany } from './components/views/LoginCompany'
import { LoginAdmin } from './components/views/LoginAdmin'
import { useAuth } from './hooks/useAuth'


const loginRoutes = {
  applicant: "/login",
  enterprise: "/loginCompany",
  admin: "/loginAdmin"
}

//El from puede ser applicant, enterprise o admin
const ProtectedRoute = ({from, children})=>{
  const {isAuthenticated} = useAuth();
  if (!isAuthenticated[from]) {
    return <Navigate to={loginRoutes[from]}/>
  }

  return children;
}


function App() {

  const location = useLocation();
  const showTabbarRoutes = ["/home/:idApplicant", "/userProfile", "/application/:idApplicant", "/offersDetail/:offerId", "/userProfile/:idApplicant"];
  const showTabbarEnterpriseRoutes = ["/homeEnterprise/:idCompany", "/EnterpriseProfile", "/OffersEnterprise/:idCompany", "/offersDetailEnterprise/:idOffer", "/Applicants", "/watchUserEnterprise/:idApplicant/:idSolicitud"];
  const showTabbarAdmin = ["/homeAdmin"];

  const showTabbar = showTabbarRoutes.some(route => matchPath(route, location.pathname));
  const showEnterpriseTabbar = showTabbarEnterpriseRoutes.some(route => matchPath(route, location.pathname));
  const showAdminTabbar = showTabbarAdmin.some(route => matchPath(route, location.pathname));

  return (
    <>
      {showTabbar && <HeaderHome />}
      {showEnterpriseTabbar && <HeaderEnterprise />}
      {showAdminTabbar && <HeaderAdmin />}

      <Routes>
        <Route path='/register' element={<UserRegister />} />
        <Route path='/registerBussiness' element={<BussinesRegister />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<HomeUser />} />
        <Route path='/userProfile' element={<UserProfile from="user" />} />
        <Route path='/offersDetail/:offerId' element={<OffersDetail />} />
        <Route path='/application' element={<Application />} />
        <Route path='/homeEnterprise' element={<HomeEnterprise />} />
        <Route path='/EnterpriseProfile' element={<EnterpriseProfile />} />
        <Route path='/createOffer' element={<CreateOffer />} />
        <Route path='/editOffer/:idOffer' element={<CreateOffer edit={true} />} />
        <Route path='/offersDetailEnterprise/:idOffer' element={<OffersDetailEnterprise />} />
        <Route path='/OffersEnterprise' element={<OffersEnterprise />} />
        <Route path='/Applicants' element={<OfferApplicants />} />
        <Route path='/selectUserEnterprise' element={<UserProfile from="enterprise" action="select" />} />
        <Route path='/watchUserEnterprise/:idApplicant/:idSolicitud' element={<UserProfile from="enterprise" />} />
        <Route path='/homeAdmin' element={<HomeAdmin />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/loginCompany' element={<LoginCompany />} />
        <Route path='/loginAdmin' element={<LoginAdmin />} />
      </Routes>
    </>
  );
}

export default App;
