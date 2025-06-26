import 'react-router-dom';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EVENTS: '/events',
  EVENT: '/events/:eventsId',
  PROFILE: '/profile',
  CREATE_EVENT: '/create-event',
} as const;

export type PathParams = {
  [ROUTES.EVENT]: {
    eventsId: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
