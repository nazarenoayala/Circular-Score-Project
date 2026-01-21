import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';


//Páginas públicas
import { PublicLayout } from '../layouts/PublicLayout.jsx';
const Home = lazy(() => import("../pages/publicPages/HomePage/Home.jsx"));
const ErrorPage = lazy(() => import("../pages/publicPages/ErrorPage/ErrorPage.jsx"));

//Páginas privadas usuario
import { UserLayout } from '../layouts/UserLayout.jsx'
const AllTestsPage = lazy(() => import("../pages/companyPages/AllTestsPage/AllTestsPage"));
const CompanyProfilePage = lazy(() => import("../pages/companyPages/CompanyProfilePage/CompanyProfilePage"));
const EditCompanyPage = lazy(() => import("../pages/companyPages/EditCompanyPage/EditCompanyPage"));
const GeneralGraphicPage = lazy(() => import("../pages/companyPages/GeneralGraphicPage/GeneralGraphicPage"));

//Páginas privadas administrador
import { AdminLayout } from '../layouts/AdminLayout.jsx';
const AdminTests = lazy(()=>import('../pages/AdminPages/AdminTests/AdminTests.jsx'));
const CreateTest = lazy(()=>import('../pages/AdminPages/CreateTest/CreateTest.jsx'));
const OneTest = lazy(()=>import('../pages/AdminPages/OneTest/OneTest.jsx'));
const AllCompanies = lazy(()=>import('../pages/AdminPages/AllCompanies/AllCompanies.jsx'));
const OneCompany = lazy(()=>import('../pages/AdminPages/OneCompany/OneCompany.jsx'));




export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Routes>

          {/* rutas públicas */}
          <Route element={<PublicRoutes />}>
            <Route element={<PublicLayout />}>
              <Route path='/' element={<Home />} />
            </Route>
          </Route>

          {/* rutas privadas*/}
          <Route element={<PrivateRoutes />}>
          {/* rutas de empresa */}
            <Route element={<UserLayout />}>
              <Route path="/allTests" element={<AllTestsPage />} />
              <Route path="/companyProfile" element={<CompanyProfilePage />} />
              <Route path="/editCompany" element={<EditCompanyPage />} />
              <Route path="/generalGraphic" element={<GeneralGraphicPage />} />
            </Route>
            {/* rutas de Admin */}
            <Route element={<AdminLayout/>}>
              <Route path='/tests' element={<AdminTests/>}/>
              <Route path='/createTest' element={<CreateTest/>}/>
              <Route path='/oneTest' element={<OneTest/>}/>
              <Route path='/allCompanies' element={<AllCompanies/>}/>
              <Route path='/oneCompany' element={<OneCompany/>}/>
            </Route>
          </Route>

          {/* rutas privadas de usuario */}

          {/* rutas para el error */}
          <Route path='*' element={<ErrorPage/>}/>


        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
