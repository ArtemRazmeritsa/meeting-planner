import { login } from '@/shared/api/auth';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsPending(true);
    setError(null);

    try {
      await login(email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (
          e.code === 'auth/user-not-found' ||
          e.code === 'auth/invalid-credential'
        ) {
          setError('Пользователь не найден или неверный пароль');
        } else if (e.code === 'auth/wrong-password') {
          setError('Неверный пароль');
        } else {
          setError('Ошибка входа: ' + e.message);
        }
      } else {
        setError('Неизвестная ошибка');
      }
    } finally {
      setIsPending(false);
    }
  };

  const clearError = () => setError(null);

  return { handleLogin, isPending, error, clearError };
}

export default useLogin;
