import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/kit/button';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/shared/ui/kit/switch';
import useToggleTheme from './model/use-toggle-theme';

function HomePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { toggleTheme } = useToggleTheme();

  return (
    <div className='flex flex-col items-center py-20 gap-10'>
      <Button
        variant='default'
        size='lg'
        className='text-2xl shadow-lg shadow-accent hover:bg-muted'
        onClick={() =>
          user
            ? navigate(ROUTES.CREATE_MEETING, { state: { reset: true } })
            : navigate(ROUTES.LOGIN, { state: { from: ROUTES.CREATE_MEETING } })
        }
      >
        Let's create meeting!
      </Button>
      <Switch onClick={toggleTheme} />
    </div>
  );
}

export const Component = HomePage;
