import './layout.css';
import { Outlet } from 'react-router';

import { NavbarPublic } from '../components/NavbarPublic/NavbarPublic';
import { FooterPublic } from '../components/FooterPublic/FooterPublic';






export const PublicLayout = ({ setShowPage, showPage}) => {






  return (
    <div className=''>
      <header>
        <NavbarPublic  setShowPage={setShowPage} showPage={showPage}/>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <FooterPublic />
      </footer>
    </div>
  )
}
