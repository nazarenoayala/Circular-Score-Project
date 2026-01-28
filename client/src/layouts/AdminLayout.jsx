import './layout.css';
import { NavbarAdmin } from '../components/Navbar/NavbarAdmin/NavbarAdmin';
import { Outlet } from 'react-router';
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
        <Outlet />
      </main>
    </div>
  )
}
