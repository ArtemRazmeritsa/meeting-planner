import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/kit/button';
import { useNavigate } from 'react-router-dom';

export function AppHeader() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className='py-4 px-4 md:px-20 lg:px-40 mb-6 w-full'>
      <div className='flex justify-between'>
        <Button
          variant='ghost'
          className='text-2xs md:text-3xl text-foreground font-semibold '
          onClick={() => navigate(ROUTES.HOME)}
        >
          Meeting Planner
        </Button>

        <div className='flex items-center gap-4'>
          <span>
            {user && (
              <span className='text-xs md:text-sm text-accent'>
                {user.email}
              </span>
            )}
          </span>

          <Button
            variant='default'
            className='text-xs md:text-base lg:text-xl hover:bg-muted'
            size='sm'
            onClick={() => (user ? logout() : navigate(ROUTES.LOGIN))}
          >
            {user ? 'Выйти' : 'Войти'}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
