import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center py-20 gap-10">
      <h1 className="text-4xl">Do you want to create a meeting?</h1>
      <Button
        variant="outline"
        size="lg"
        className="text-xl bg-popover"
        onClick={() =>
          user
            ? navigate(ROUTES.CREATE_EVENT)
            : navigate(ROUTES.LOGIN, { state: { from: ROUTES.CREATE_EVENT } })
        }
      >
        Create
      </Button>
    </div>
  );
}

export const Component = HomePage;
