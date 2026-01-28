import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';


//Páginas públicas
import { PublicLayout } from '../layouts/PublicLayout.jsx';
const Home = lazy(() => import("../pages/publicPages/HomePage/Home.jsx"));
const ActivateUser = lazy(()=> import('../components/PublicComponents/ActivateUser/ActivateUser.jsx'));
const ResetPassword = lazy(()=> import('../pages/publicPages/ResetPassword/ResetPassword.jsx'));
const ErrorPage = lazy(() => import("../pages/publicPages/ErrorPage/ErrorPage.jsx"));

//Páginas privadas usuario
import { UserLayout } from '../layouts/UserLayout.jsx';
const AllTestsPage = lazy(() => import("../pages/companyPages/AllTestsPage/AllTestsPage.jsx"));
const CompanyRegister = lazy(() => import("../pages/companyPages/CompanyRegister/CompanyRegister.jsx"));
const CompanyProfilePage = lazy(() => import("../pages/companyPages/CompanyProfilePage/CompanyProfilePage"));
const EditCompanyPage = lazy(() => import("../pages/companyPages/EditCompanyPage/EditCompanyPage"));
const GeneralGraphicPage = lazy(() => import("../pages/companyPages/GeneralGraphicPage/GeneralGraphicPage"));
const UserODSGraphic = lazy(() => import('../pages/companyPages/UserODSGraphic/UserODSGraphic.jsx'));
const OneTestCompany = lazy(() => import("../pages/companyPages/OneTestCompany/OneTestCompany.jsx"));
/* const OneQuestion = lazy(() => import("../pages/companyPages/OneQuestionPage/OneQuestion.jsx")); */
const UserTestRecord = lazy(() => import("../pages/companyPages/UserTestRecord/UserTestRecord.jsx"));

//Páginas privadas administrador
import { AdminLayout } from '../layouts/AdminLayout.jsx';
import { useState } from 'react';
const AdminTests = lazy(()=>import('../pages/AdminPages/AdminTests/AdminTests.jsx'));
const CreateTest = lazy(()=>import('../pages/AdminPages/CreateTest/CreateTest.jsx'));
const OneTest = lazy(()=>import('../pages/AdminPages/OneTest/OneTest.jsx'));
const AllCompanies = lazy(()=>import('../pages/AdminPages/AllCompanies/AllCompanies.jsx'));
const OneCompany = lazy(()=>import('../pages/AdminPages/OneCompany/OneCompany.jsx'));
const Dashboard = lazy(()=> import('../pages/AdminPages/Dashboard/Dashboard.jsx'));
const Record = lazy(()=> import ('../pages/AdminPages/AdminTestsRecord/AdminTestsRecord.jsx'));
const AdminGraphics = lazy(()=> import ('../pages/AdminPages/AdminGraphics/AdminGraphics.jsx'));
const AdminODSGraphics = lazy(()=> import ('../pages/AdminPages/AdminODSGraphic/AdminODSGraphic.jsx'));


export const AppRoutes = () => {

    const [showPage, setShowPage] = useState('register');

  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Routes>

          {/* rutas públicas */}
          <Route element={<PublicRoutes />}>
            <Route element={<PublicLayout  setShowPage={setShowPage} showPage={showPage}/>}>
              <Route path='/' element={<Home 
                                          setShowPage={setShowPage} 
                                          showPage={showPage}
                                      />} 
              />
                <Route 
                  path='activateUser/:token/:user_id' 
                  element={<ActivateUser 
                            setShowPage={setShowPage}
                          />}
                />
              <Route/>
              <Route 
                path="resetPassword/:token/:user_id" 
                  element={<ResetPassword
                            setShowPage={setShowPage}
                          />}/>
            </Route>
          </Route>

          {/* rutas privadas*/}
          <Route element={<PrivateRoutes />}>

            {/* rutas de empresa */}
            <Route element={<UserLayout />}>
              <Route path="/allTests" element={<AllTestsPage />} />
              <Route path="/companyRegister/:user_id" element={<CompanyRegister />} />
              <Route path="/companyProfile/:id" element={<CompanyProfilePage />} />
              <Route path="/editCompany/:id" element={<EditCompanyPage />} />
              <Route path="/generalGraphic" element={<GeneralGraphicPage />} />
              <Route path="/userODSGraphic" element={<UserODSGraphic />} />
              <Route path='/oneTestCompany/:id' element={<OneTestCompany />} />
              {/* <Route path="/oneQuestion/:id" element={<OneQuestion />} /> */}
              <Route path='/userTestRecord' element={<UserTestRecord />} /> {/* historial de tests */}
              {/*  "/IAChat" -> navbar user IA Chat */}
            </Route>

            {/* rutas de Admin */}
            <Route element={<AdminLayout />}>
              <Route path='/tests' element={<AdminTests />} />
              <Route path='/createTest' element={<CreateTest />} />
              <Route path='/oneTest/:id' element={<OneTest />} />
              <Route path='/allCompanies' element={<AllCompanies />} />
              <Route path='/oneCompany/:user_id' element={<OneCompany />} />
              {/* <Route path='/dashboard' element={<Dashboard />} /> */}
              {/* <Route path='/AdminTestsRecord' element={<Record />} /> historial de tests */}
              {/* <Route path='/graphic' element={<AdminGraphics />} /> */}
              {/* <Route path='/AdminODSGraphic' element={<AdminODSgraphic />} /> */}
            </Route>
            {/* "/IApromptEdit" -> navbar admin IA Prompt Editor */}
          </Route>

          {/* rutas para el error */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};