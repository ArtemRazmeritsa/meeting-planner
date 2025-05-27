import { useAuth } from '@/shared/hooks/use-auth';
import { ROUTES } from '@/shared/model/routes';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
  return null;
}

  if (!user) {
    return (
      <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
