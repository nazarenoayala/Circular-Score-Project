import './layout.css';
import { Outlet } from 'react-router';
import { NavbarPublic } from '../components/NavbarPublic/NavbarPublic';
import { FooterPublic } from '../components/FooterPublic/FooterPublic';

export const PublicLayout = () => {
  return (
    <div className=''>
      <header>
        <NavbarPublic />
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
