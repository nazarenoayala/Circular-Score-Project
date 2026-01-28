import './layout.css';
import { Outlet } from 'react-router';
import { NavbarAdmin } from '../components/Navbar/NavbarAdmin/NavbarAdmin';
import { NavbarHeaderGeneral } from '../components/Navbar/NavbarHeaderGeneral/NavbarHeaderGeneral';
import { NavbarOffcanvasAdmin } from '../components/Navbar/NavbarOffcanvasAdmin/NavbarOffcanvasAdmin';

export const AdminLayout = () => {
  return (
    <div className='layoutAdminPublic'>
      <header>
        <div className='desktop'>
          {/* lateral bar  */}
          <NavbarAdmin />
        </div>
        <div className='mobile'>
          {/*  offcanvas */}
          <NavbarOffcanvasAdmin />
        </div>
      </header>

      <main>
        <NavbarHeaderGeneral />
        <Outlet />
      </main>
    </div>
  )
}
