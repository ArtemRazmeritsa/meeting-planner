import { createMeeting } from '@/shared/api/meeting';
import { useCreateMeetingStore } from '../../store/use-create-meeting-store';
import { Button } from '@/shared/ui/kit/button';
import { IMeeting } from '@/shared/types/meeting';
import { StepFlowContext } from '../../context/StepFlowContext';
import { useContext, useEffect, useState } from 'react';
import SuccessModal from './SuccessModal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';

function FinalStep() {
  const { formData, setIsMeetingCreated, isMeetingCreated } =
    useCreateMeetingStore();
  const ctx = useContext(StepFlowContext);
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isMeetingCreated) {
      navigate(ROUTES.MEETINGS, { replace: true });
    }
  }, [isMeetingCreated, navigate]);

  const handleGoToMeetings = () => {
    setIsMeetingCreated(true);
    navigate(ROUTES.MEETINGS, { replace: true });

  };

  const onSubmit = async (formData: IMeeting) => {
    setIsLoading(true);
    try {
      const meeting = await createMeeting(formData);
      const meetingLink = `${window.location.origin}/meeting/${meeting.id}`;
      formData.link = meetingLink;
      setMeetingLink(meetingLink);
      setIsOpenModal(true);
    } catch (e) {
      console.error('Ошибка при создании встречи:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center gap-6 w-full'>
        <div className='rounded-xl border-secondary-foreground border-1 p-2 w-full md:w-[80%] lg:w-[60%] text-center break-words'>
          <h3>{formData.title}</h3>
        </div>
        <ul
          className={`rounded-xl border-secondary-foreground w-[70%] border-1 p-2 ${
            formData.dates.length < 8
              ? 'flex flex-col items-center gap-1'
              : 'grid grid-cols-2 gap-1'
          }`}
        >
          {formData.dates
            .slice()
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date: Date) => (
              <li key={date.getTime()} className='rounded bg-accent/20 p-1'>
                {date.toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </li>
            ))}
        </ul>
        <div className='flex gap-10'>
          <Button onClick={ctx.onBack} type='submit'>
            Назад
          </Button>
          <Button onClick={() => onSubmit(formData)} disabled={isLoading}>
            {' '}
            {isLoading ? 'Создаем...' : 'Создать встречу'}
          </Button>
        </div>
      </div>
      <SuccessModal
        isOpen={isOpenModal}
        link={meetingLink}
        setIsOpen={setIsOpenModal}
        onGoToMeetings={handleGoToMeetings}
      />
    </>
  );
}

export const Component = FinalStep;
