import { ROUTES } from '@/shared/model/routes';
import AuthLayout from './ui/Auth-layout';
import { Link } from 'react-router-dom';
import RegisterForm from './ui/Register-form';

function RegisterPage() {
  return (
    <AuthLayout
      title={'Регистрация'}
      form={<RegisterForm />}
      description={'Введите Ваш email и пароль для регистрации в системе'}
      footerText={
        <>
          Уже есть аккаунт?
          <Link className="underline text-primary" to={ROUTES.LOGIN}>
            Войти
          </Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
