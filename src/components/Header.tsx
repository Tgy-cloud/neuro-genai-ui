import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <Link to='/' className='flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white'>
          <BookOpen className='w-6 h-6 text-blue-500' />
          <span>Sema</span>
        </Link>
        <nav className='flex items-center space-x-4'>
          <Link to='/' className='text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'>
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
