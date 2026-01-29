import './layout.css';
import { Outlet } from 'react-router';
import { NavbarHeaderGeneral } from '../components/Navbar/NavbarHeaderGeneral/NavbarHeaderGeneral';
import { NavbarOffcanvasUser } from '../components/Navbar/NavbarOffcanvasUser/NavbarOffcanvasUser.jsx';
import { NavbarUser } from '../components/Navbar/NavbarUser/NavbarUser';
import { FooterMobile } from '../components/Footers/FooterMobile/FooterMobile.jsx';



export const UserLayout = () => {
  return (
    <div className='layoutAdminPublic'>
      <header>
        <div className='desktop'>
          {/* lateral bar  */}
          <NavbarUser />
        </div>
        <div className='mobile'>
          {/*  offcanvas */}
          <NavbarOffcanvasUser />
        </div>
      </header>
      <main>
        <NavbarHeaderGeneral />
        <Outlet />
        <div className="mobile">
        <FooterMobile/>
        </div>
      </main>
    </div>
  )
}
