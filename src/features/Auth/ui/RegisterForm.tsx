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
import useRegister from '../model/use-register';
import useClearError from '../model/use-clear-error';

const registerSchema = z
  .object({
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
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });

function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const { handleRegister, isPending, error, clearError } = useRegister();

  useClearError(form, error, clearError);

  const onSubmit = form.handleSubmit((data) => {
    handleRegister(data.email, data.password);
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
              <FormLabel>Пароль</FormLabel>
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
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input type={'password'} {...field} />
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

export default RegisterForm;
