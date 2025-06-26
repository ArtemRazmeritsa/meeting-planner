import { ROUTES } from '@/shared/config/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from './ui/Auth-layout';
import LoginForm from './ui/Login-form';
import { useEffect } from 'react';
import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';

function LoginPage() {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || ROUTES.HOME;

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <AuthLayout
      title={'Вход'}
      form={<LoginForm />}
      description={'Введите Ваш  email и пароль для входа в систему'}
      footerText={
        <>
          Нет аккаунта?
          <Link className="underline text-primary" to={ROUTES.REGISTER}>
            Зарегистрироваться
          </Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
