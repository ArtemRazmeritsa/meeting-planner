import AppHeader from '@/features/AppHeader';
import { Toaster } from '@/shared/ui/kit/sonner';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <Toaster richColors position='top-center' />
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default App;
