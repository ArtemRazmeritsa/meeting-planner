import { ROUTES } from '@/shared/config/routes';
import AuthLayout from './ui/AuthLayout';
import { Link, Navigate } from 'react-router-dom';
import RegisterForm from './ui/RegisterForm';
import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';

function RegisterPage() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (user) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <AuthLayout
      title={'Регистрация'}
      form={<RegisterForm />}
      description={'Введите Ваш email и пароль для регистрации в системе'}
      footerText={
        <>
          Уже есть аккаунт?
          <Link className='underline text-primary' to={ROUTES.LOGIN}>
            Войти
          </Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
