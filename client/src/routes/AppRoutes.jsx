import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import { PrivateRoutes } from './PrivateRoutes';
import { UserLayout } from '../layouts/UserLayout.jsx';


const AllTestsPage = lazy(() => import("../pages/companyPages/AllTestsPage/AllTestsPage"));
const CompanyProfilePage = lazy(() => import("../pages/companyPages/CompanyProfilePage/CompanyProfilePage"));
const EditCompanyPage = lazy(() => import("../pages/companyPages/EditCompanyPage/EditCompanyPage"));
const GeneralGraphicPage = lazy(() => import("../pages/companyPages/GeneralGraphicPage/GeneralGraphicPage"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Routes>
          {/* rutas privadas de la empresa normal*/}

          <Route element={<PrivateRoutes />}>
            <Route element={<UserLayout/>}>
              <Route path="/allTests" element={<AllTestsPage />} />
              <Route path="/companyProfile" element={<CompanyProfilePage />} />
              <Route path="/editCompany" element={<EditCompanyPage />} />
              <Route path="/generalGraphic" element={<GeneralGraphicPage />} />
            </Route>
          </Route>


        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
