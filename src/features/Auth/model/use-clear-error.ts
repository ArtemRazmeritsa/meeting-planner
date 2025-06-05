import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

function useClearError<T extends FieldValues>(
  form: UseFormReturn<T>,
  error: string | null,
  clearError: () => void
) {
  useEffect(() => {
    if (!error) return;

    const subscription = form.watch(() => {
      if (error) clearError();
    });

    return () => subscription.unsubscribe();
  }, [form, error, clearError]);
}

export default useClearError;
