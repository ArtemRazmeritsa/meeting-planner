import AppHeader from '@/features/AppHeader';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default App;
