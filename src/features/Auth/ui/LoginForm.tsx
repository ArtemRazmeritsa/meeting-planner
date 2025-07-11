import { Button } from '@/shared/ui/kit/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '../model/use-login';
import useClearError from '../model/use-clear-error';

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email обязателен',
    })
    .email('Неверный email'),
  password: z
    .string({
      required_error: 'Пароль обязателен',
    })
    .min(6, 'Пароль должен быть не менее 6 символов'),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { handleLogin, isPending, error, clearError } = useLogin();

  useClearError(form, error, clearError);

  const onSubmit = form.handleSubmit((data) => {
    handleLogin(data.email, data.password);
  });

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Введите email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Введите пароль'
                  type={'password'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className='text-destructive text-sm'>{error}</p>}
        <Button disabled={isPending} type='submit'>
          Войти
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
