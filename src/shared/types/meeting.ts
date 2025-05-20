export interface Meeting {
  id: string;
  title: string;
  createdBy: string;
  availableDates: Date[];
  accessLink: string;
  allowAnonymousVotes: boolean;
  participants: string[];
  createdAt: Date;
}
