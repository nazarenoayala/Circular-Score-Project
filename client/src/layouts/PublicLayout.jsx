import { NavbarPublic } from '../components/NavbarPublic/NavbarPublic';
import { Outlet } from 'react-router';
import './layout.css';

export const PublicLayout = () => {
  return (
    <div className=''>
      <header>
        <NavbarPublic />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
