import { ROUTES } from '@/shared/model/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from './ui/Auth-layout';
import LoginForm from './ui/Login-form';
import { useAuth } from '@/shared/hooks/use-auth';
import { useEffect } from 'react';

function LoginPage() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || ROUTES.HOME;

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);


  if (isLoading) {
    return <div>Загрузка...</div>;
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
