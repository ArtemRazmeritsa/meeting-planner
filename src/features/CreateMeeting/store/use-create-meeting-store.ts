import { create } from 'zustand';
import { IMeeting } from '@/shared/types/meeting';

type CreateMeetingStore = {
  formData: IMeeting;
  isMeetingCreated: boolean;
  setFormData: (data: Partial<IMeeting>) => void;
  reset: () => void;
  setIsMeetingCreated: (created: boolean) => void;
};

export const useCreateMeetingStore = create<CreateMeetingStore>((set) => ({
  formData: {
    title: '',
    dates: [],
    link: '',
  },
  isMeetingCreated: false,
  setFormData: (data: Partial<IMeeting>) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setIsMeetingCreated: (created: boolean) => set({ isMeetingCreated: created }),
  reset: () =>
    set({
      formData: {
        title: '',
        dates: [],
        link: '',
      },
      isMeetingCreated: false,
    }),
}));
