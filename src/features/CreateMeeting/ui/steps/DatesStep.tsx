import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormMessage } from '@/shared/ui/kit/form';
import { Button } from '@/shared/ui/kit/button';
import { useCreateMeetingStore } from '../../store/use-create-meeting-store';
import { useContext, useEffect } from 'react';
import { StepFlowContext } from '../../context/StepFlowContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';

const datesFormSchema = z.object({
  dates: z.array(z.date()).min(1, 'Выберите хотя бы одну дату'),
});

function DatesStep() {
  const { formData, setFormData, isMeetingCreated } = useCreateMeetingStore();
  const ctx = useContext(StepFlowContext);
  const defaultClassNames = getDefaultClassNames();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(datesFormSchema),
    mode: 'onChange',
    defaultValues: {
      dates: formData.dates || [],
    },
  });

  useEffect(() => {
    if (isMeetingCreated) {
      navigate(ROUTES.MEETINGS, { replace: true });
    }
  }, [isMeetingCreated, navigate]);

  const onSubmit = form.handleSubmit((data) => {
    setFormData(data);
  });

  return (
    <Form {...form}>
      <form
        className='w-full flex flex-col items-center gap-4'
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          name='dates'
          render={({ field }) => (
            <>
              <DayPicker
                classNames={{
                  root: `${defaultClassNames.root} scale-80 sm:scale-100 origin-top`,
                }}
                mode='multiple'
                disabled={{ before: new Date() }}
                selected={field.value}
                onSelect={(dates) => {
                  const newDates = Array.isArray(dates)
                    ? dates
                    : dates
                    ? [dates]
                    : [];
                  field.onChange(newDates);
                  setFormData({ ...formData, dates: newDates });
                }}
                modifiers={{
                  selected: (date: Date) =>
                    (field.value || []).some(
                      (d: Date) => d.toDateString() === date.toDateString()
                    ),
                }}
              />
              <FormMessage />
            </>
          )}
        />
        <div className='flex gap-20'>
          <Button onClick={ctx.onBack} type='button'>
            Назад
          </Button>
          <Button
            onClick={ctx.onNext}
            disabled={!form.formState.isValid}
            type='submit'
          >
            Далее
          </Button>
        </div>
      </form>
    </Form>
  );
}

export const Component = DatesStep;
