export interface Meeting {
  id: string;
  title: string;
  createdBy?: string;
  availableDates?: Date[];
  accessLink?: string;
  participants?: string[];
  createdAt?: Date;
}
