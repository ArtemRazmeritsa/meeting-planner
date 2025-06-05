import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { useNavigate } from 'react-router-dom';

export function AppHeader() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="bg-background border-b border-border/40 shadow-sm py-3 px-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-xl font-semibold hover:bg-color/100"
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
          <Button
            variant="outline"
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
