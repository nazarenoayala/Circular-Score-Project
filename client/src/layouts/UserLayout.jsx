import './layout.css';
import { NavbarOffcanvasUser } from '../components/Navbar/NavbarOffcanvasUser/NavbarOffcanvasUser.jsx';
import { NavbarUser } from '../components/Navbar/NavbarUser/NavbarUser';
import { Outlet } from 'react-router';

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
        <Outlet />
      </main>
    </div>
  )
}
