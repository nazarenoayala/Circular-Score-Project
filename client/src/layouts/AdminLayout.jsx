import './layout.css';
import { NavbarAdmin } from '../components/NavbarAdmin/NavbarAdmin';
import { Outlet } from 'react-router';

export const AdminLayout = () => {
  return (
    <div className='layoutAdminPublic'>
      <header>
        <NavbarAdmin />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
