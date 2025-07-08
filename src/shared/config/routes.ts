import 'react-router-dom';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MEETINGS: '/meetings',
  MEETING: '/meetings/:meetingId',
  PROFILE: '/profile',
  CREATE_MEETING: '/create-meeting',
} as const;

export type PathParams = {
  [ROUTES.MEETING]: {
    meetingId: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
