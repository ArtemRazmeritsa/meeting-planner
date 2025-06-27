import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/kit/button';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/shared/ui/kit/switch';
import useToggleTheme from './model/use-toggle-theme';



export function AppHeader() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const {toggleTheme} = useToggleTheme()

  return (
    <header className="bg-secondary shadow-sm shadow-secondary py-4 px-4 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-xl text-foreground font-semibold "
          onClick={() => navigate(ROUTES.HOME)}
        >
          Meeting Planner
        </Button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user && (
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
            )}
          </span>
          <Switch onClick={toggleTheme}></Switch>
          <Button
            variant="default"
            className="text-primary-foreground/80 shadow-secondary-foreground/80 hover:bg-accent-foreground"
            size="sm"
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
