import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/kit/button';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center py-20 gap-10">
      <Button
        variant="default"
        size="lg"
        className="text-2xl inset-shadow-sm inset-shadow-secondary hover:bg-accent"
        onClick={() =>
          user
            ? navigate(ROUTES.CREATE_EVENT)
            : navigate(ROUTES.LOGIN, { state: { from: ROUTES.CREATE_EVENT } })
        }
      >
        Let's create meeting!
      </Button>
    </div>
  );
}

export const Component = HomePage;
