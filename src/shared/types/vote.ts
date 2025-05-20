export interface Vote {
  meetingId: string;
  userId?: string;
  anonymousId?: string;
  selectedDates: string[];
  votedAt: Date;
}
