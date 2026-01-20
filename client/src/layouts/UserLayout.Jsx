import './layout.css';
import { Outlet } from 'react-router';

export const PublicLayout = () => {
  return (
    <div className='layoutAdminPublic'>
      <header>

      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
