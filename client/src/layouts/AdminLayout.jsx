import './layout.css';
import { NavbarAdmin } from '../components/NavbarAdmin/NavbarAdmin';
import { Outlet } from 'react-router';
import { NavbarHeaderGeneral } from '../components/NavbarHeaderGeneral/NavbarHeaderGeneral';

export const AdminLayout = () => {
  return (
    <div className='layoutAdminPublic'>
      <header style={{ height: '100%' }}>
        <NavbarAdmin />
      </header>

      <main>
        <NavbarHeaderGeneral />
        <Outlet />
      </main>
    </div>
  )
}
