import {lazy, Suspense} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import {PrivateRoutes} from './PrivateRoutes'




const AllTestsPage = lazy(()=>import("../pages/compagnyPages/AllTestsPage/AllTestsPage"))
const CompagnyProfilePage = lazy(()=>import("../pages/compagnyPages/CompagnyProfilePage/CompagnyProfilePage"))
const EditCompagnyPage = lazy(()=>import("../pages/compagnyPages/EditCompagnyPage/EditCompagnyPage"))
const GeneralGraphicPage = lazy(()=>import("../pages/compagnyPages/GeneralGraphicPage/GeneralGraphicPage"))




export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Routes>
          {/* rutas privadas de la empresa normal*/}

          <Route element={<PrivateRoutes />}>
            <Route path="/allTests" element={<AllTestsPage />} />
            <Route path="/compagnyProfile" element={<CompagnyProfilePage />} />
            <Route path="/editCompagny" element={<EditCompagnyPage />} />
            <Route path="/generalGraphic" element={<GeneralGraphicPage />} />
          </Route>





        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
