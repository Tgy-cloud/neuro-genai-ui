import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'sonner';

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <Header />
      <main className='container mx-auto px-4 py-8'>
        <Outlet />
      </main>
      <Toaster richColors />
    </div>
  );
};

export default Layout;
