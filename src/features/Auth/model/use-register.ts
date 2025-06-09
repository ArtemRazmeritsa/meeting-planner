import { register } from '@/shared/api/auth';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useRegister() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);
    try {
      await register(email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/email-already-in-use') {
          setError('Пользователь с таким email уже зарегистрирован');
        } else if (e.code === 'auth/weak-password') {
          setError('Пароль слишком слабый. Минимум 6 символов.');
        } else if (e.code === 'auth/invalid-email') {
          setError('Некорректный email');
        } else if (e.code === 'auth/too-many-requests') {
          setError('Слишком много попыток. Попробуйте позже.');
        } else {
          setError('Ошибка регистрации');
        }
      }
    } finally {
      setIsPending(false);
    }
  };

  const clearError = () => setError(null);

  return { handleRegister, isPending, error, clearError };
}

export default useRegister;
