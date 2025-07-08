import { ROUTES } from '@/shared/config/routes';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [ {
          path: ROUTES.MEETINGS,
          lazy: () => import('@/features/Meetings/Meetings.page'),
        },
        {
          path: ROUTES.MEETING,
          lazy: () => import('@/features/Meeting/Meeting.page'),
        },
        {
          path: ROUTES.CREATE_MEETING,
          lazy: () => import('@/features/CreateMeeting/CreateMeeting.page'),
          children: [
            {
              path: 'title',
              lazy: () => import('@/features/CreateMeeting/ui/steps/TitleStep'),
            },
            {
              path: 'dates',
              lazy: () => import('@/features/CreateMeeting/ui/steps/DatesStep'),
            },
            {
              path: 'final',
              lazy: () => import('@/features/CreateMeeting/ui/steps/FinalStep'),
            },]
          
          }
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/Auth/Login.page'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/Auth/Register.page'),
      },
      {
        path: ROUTES.PROFILE,
        lazy: () => import('@/features/Profile/Profile.page'),
      },
      {
        path: ROUTES.HOME,
        lazy: () => import('@/features/HomePage/Home.page'),
      },
    ],
  },
]);
