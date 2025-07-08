type StepProgressProps = {
  currentStep: number;
  totalSteps?: number;
};

const ProgressBar = ({ currentStep, totalSteps = 3 }: StepProgressProps) => {
  return (
    <div className='w-full  max-w-[70%] md:max-w-[40%] mx-auto py-4'>
      <div className='relative h-7'>
        {/* Линия под точками */}
        <div className='absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-accent/60 z-0' />

        {/* Активная линия */}
        <div
          className='absolute top-1/2 -translate-y-1/2 h-1 bg-primary z-10 transition-all'
          style={{
            width:
              totalSteps > 1
                ? `${(currentStep / (totalSteps - 1)) * 100}%`
                : '0%',
          }}
        />

        {/* Точки */}
        {[...Array(totalSteps)].map((_, i) => {
          const leftPercent =
            totalSteps === 1 ? 0 : (i / (totalSteps - 1)) * 100;

          return (
            <div
              key={i}
              className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20'
              style={{ left: `${leftPercent}%` }}
            >
              <div
                className={`rounded-full transition-all ${
                  i <= currentStep
                    ? 'w-6 h-6 bg-primary'
                    : 'w-2.5 h-2.5 bg-accent'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
