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

//El from puede ser applicant, enterprise o admin
const ProtectedRoute = ({from, children})=>{
  const {isAuthenticated} = useAuth();
  if (!isAuthenticated[from]) {
    return <Navigate to="/"/>
  }

  return children;
}


function App() {

  const location = useLocation();
  const showTabbarRoutes = ["/home", "/userProfile", "/application", "/offersDetail/:offerId", "/userProfile"];
  const showTabbarEnterpriseRoutes = ["/homeEnterprise", "/EnterpriseProfile", "/OffersEnterprise", "/offersDetailEnterprise/:idOffer", "/Applicants/:idOffer", "/watchUserEnterprise/:idApplicant/:idSolicitud", "/selectUserEnterprise/:idApplicant/:idOfert"];
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
        <Route path='/' element={<LandingPage />} />

        <Route path='/register' element={<UserRegister />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<ProtectedRoute from="applicant"><HomeUser /></ProtectedRoute>} />
        <Route path='/userProfile' element={<ProtectedRoute from="applicant"><UserProfile from="user" /></ProtectedRoute>} />
        <Route path='/offersDetail/:offerId' element={<ProtectedRoute from="applicant"><OffersDetail /></ProtectedRoute>} />
        <Route path='/application' element={<ProtectedRoute from="applicant"><Application /></ProtectedRoute>} />

        <Route path='/registerBussiness' element={<BussinesRegister />} />
        <Route path='/loginCompany' element={<LoginCompany />} />
        <Route path='/homeEnterprise' element={<ProtectedRoute from="enterprise"><HomeEnterprise /></ProtectedRoute>} />
        <Route path='/EnterpriseProfile' element={<ProtectedRoute from="enterprise"><EnterpriseProfile /></ProtectedRoute>} />
        <Route path='/createOffer' element={<ProtectedRoute from="enterprise"><CreateOffer /></ProtectedRoute>} />
        <Route path='/editOffer/:idOffer' element={<ProtectedRoute from="enterprise"><CreateOffer edit={true} /></ProtectedRoute>}/>
        <Route path='/offersDetailEnterprise/:idOffer' element={<ProtectedRoute from="enterprise"><OffersDetailEnterprise /></ProtectedRoute>} />
        <Route path='/OffersEnterprise' element={<ProtectedRoute from="enterprise"><OffersEnterprise /></ProtectedRoute>} />
        <Route path='/Applicants/:idOffer' element={<ProtectedRoute from="enterprise"><OfferApplicants /></ProtectedRoute>} />
        <Route path='/selectUserEnterprise/:idApplicant/:idOfert' element={<ProtectedRoute from="enterprise"><UserProfile from="enterprise" action="select" /></ProtectedRoute>} />
        <Route path='/watchUserEnterprise/:idApplicant/:idSolicitud' element={<ProtectedRoute from="enterprise"><UserProfile from="enterprise" /></ProtectedRoute>} />

        <Route path='/homeAdmin' element={<ProtectedRoute from="admin"><HomeAdmin /></ProtectedRoute>} />
        <Route path='/loginAdmin' element={<LoginAdmin />} />
      </Routes>
    </>
  );
}

export default App;
