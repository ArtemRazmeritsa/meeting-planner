import { useAuth } from '@/shared/hooks/use-auth';

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      {user ? (
        <>
          <p>Пользователь: {user.email}</p>
          <p>UUID: {user.uid}</p>
          <button onClick={logout}>Выйти</button>
        </>
      ) : (
        <p>Пользователь не авторизован</p>
      )}
    </div>
  );
};

export default ProfilePage;
