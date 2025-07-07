import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCreateMeetingStore } from './store/use-create-meeting-store';
import { useEffect } from 'react';
import { steps } from './config/configSteps';
import { StepFlowContext } from './context/StepFlowContext';
import ProgressBar from '@/shared/ui/kit/progress-bar';
import StepsLayout from './ui/StepsLayout';

function CreateEventPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, reset } = useCreateMeetingStore();
  const currentPath = location.pathname.split('/').pop();
  const currentStep = steps.find((s) => s.path === currentPath) ?? steps[0];
  const currentStepIndex = steps.findIndex((s) => s === currentStep);

  useEffect(() => {
    if (location.state?.reset) {
      reset();
    }
  }, [location, reset]);

  useEffect(() => {
    if (location.pathname === '/create-meeting') {
      navigate('title', { replace: true });
      console.log(location.state);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (currentStepIndex !== 0) {
      const isValid = currentStep.validate(formData);
      if (!isValid) {
        navigate('/create-meeting/title', { replace: true });
      }
    }
  }, [currentStepIndex, currentStep, formData, navigate]);

  const nextStep = () => {
    const next = steps[currentStepIndex + 1];
    if (next) {
      navigate(`/create-meeting/${next.path}`);
    }
  };

  const prevStep = () => {
    const prev = steps[currentStepIndex - 1];
    if (prev) {
      navigate(`/create-meeting/${prev.path}`);
    }
  };

  return (
    <div className='flex flex-col items-center w-full py-4'>
      <StepFlowContext.Provider
        value={{
          currentStepIndex,
          totalSteps: steps.length,
          onNext: nextStep,
          onBack: prevStep,
        }}
      >
        <ProgressBar currentStep={currentStepIndex} />
        <StepsLayout title={currentStep.title}>
          <Outlet />
        </StepsLayout>
      </StepFlowContext.Provider>
    </div>
  );
}

export const Component = CreateEventPage;
