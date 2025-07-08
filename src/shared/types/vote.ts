export interface IVote {
  meetingId: string;
  userId?: string;
  anonymousId?: string;
  selectedDates: string[];
  votedAt: Date;
}
