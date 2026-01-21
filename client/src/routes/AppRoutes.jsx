import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { AdminRoutes } from './AdminRoutes';


//Páginas públicas
import { PublicLayout } from '../layouts/PublicLayout.jsx';
const Home = lazy(() => import("../pages/publicPages/HomePage/Home.jsx"));
const ErrorPage = lazy(()=> import("../pages/publicPages/ErrorPage/ErrorPage.jsx"))

//Páginas privadas usuario
import { UserLayout } from '../layouts/UserLayout.jsx'
const AllTestsPage = lazy(() => import("../pages/companyPages/AllTestsPage/AllTestsPage"));
const CompanyProfilePage = lazy(() => import("../pages/companyPages/CompanyProfilePage/CompanyProfilePage"));
const EditCompanyPage = lazy(() => import("../pages/companyPages/EditCompanyPage/EditCompanyPage"));
const GeneralGraphicPage = lazy(() => import("../pages/companyPages/GeneralGraphicPage/GeneralGraphicPage"));

//Páginas privadas administrador
import { AdminLayout } from '../layouts/AdminLayout.jsx';




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

          {/* rutas privadas de la empresa normal*/}
          <Route element={<PrivateRoutes />}>
            <Route element={<UserLayout />}>
              <Route path="/allTests" element={<AllTestsPage />} />
              <Route path="/companyProfile" element={<CompanyProfilePage />} />
              <Route path="/editCompany" element={<EditCompanyPage />} />
              <Route path="/generalGraphic" element={<GeneralGraphicPage />} />
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
