import { createContext } from 'react';

export const StepFlowContext = createContext<{
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}>({
  currentStepIndex: 0,
  totalSteps: 0,
  onNext: () => {},
  onBack: () => {},
});
