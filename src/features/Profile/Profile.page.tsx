import { useAuth } from '@/shared/hooks/use-auth';
import { ROUTES } from '@/shared/model/routes';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isLoading, logout } = useAuth();

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
