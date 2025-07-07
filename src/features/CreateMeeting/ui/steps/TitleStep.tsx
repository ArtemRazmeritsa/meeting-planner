import { Button } from '@/shared/ui/kit/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateMeetingStore } from '../../store/use-create-meeting-store';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { StepFlowContext } from '../../context/StepFlowContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';

const titleFormSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
});

function TitleStep() {
  const { setFormData, formData, isMeetingCreated, reset } =
    useCreateMeetingStore();
  const ctx = useContext(StepFlowContext);
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.state?.reset) {
      reset();
    }
  }, [location.state, reset]);

  useEffect(() => {
    if (!location.state?.reset && isMeetingCreated) {
      navigate(ROUTES.MEETINGS, { replace: true });
    }
  }, [isMeetingCreated, navigate, location.state]);

  const form = useForm({
    resolver: zodResolver(titleFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: formData.title,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    setFormData(data);
  });

  return (
    <Form {...form}>
      <form className='flex w-full flex-col gap-8 pt-8' onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input maxLength={40} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='w-30 self-center'
          disabled={!form.formState.isValid}
          onClick={ctx.onNext}
          type='submit'
        >
          Далее
        </Button>
      </form>
    </Form>
  );
}

export const Component = TitleStep;
