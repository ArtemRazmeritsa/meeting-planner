import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';
import { ROUTES } from '@/shared/config/routes';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isLoading, logout } = useAuthStore();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <div>
      {user && (
        <>
          <p>Пользователь: {user.email}</p>
          <p>UUID: {user.uid}</p>
          <button onClick={logout}>Выйти</button>
        </>
      )}
    </div>
  );
};

export const Component = ProfilePage;
