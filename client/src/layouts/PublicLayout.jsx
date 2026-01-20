import { Outlet } from 'react-router';
import './layout.css';

export const PublicLayout = () => {
  return (
    <div className=''>
      <header>

      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
