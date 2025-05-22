import { ROUTES } from '@/shared/model/routes';
import { Link } from 'react-router-dom';
import AuthLayout from './Auth-layout';
import LoginForm from './Login-form';

function LoginPage() {
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
