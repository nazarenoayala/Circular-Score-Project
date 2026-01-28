import { NavbarHeaderGeneral } from '../components/NavbarHeaderGeneral/NavbarHeaderGeneral';
import { NavbarUser } from '../components/NavbarUser/NavbarUser';
import './layout.css';
import { Outlet } from 'react-router';



export const UserLayout = () => {
  return (
    <div className='layoutAdminPublic'>
      <header>
        <NavbarUser/>
      </header>
      <main>
         <NavbarHeaderGeneral />
        <Outlet />
      </main>
    </div>
  )
}
