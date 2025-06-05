import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';
import { ROUTES } from '@/shared/model/routes';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return (
      <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
