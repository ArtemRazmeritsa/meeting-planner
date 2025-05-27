import { ROUTES } from '../shared/model/routes';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ProtectedRoute from './protected-route';
import AppHeader from '@/features/AppHeader';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            path: ROUTES.EVENTS,
            lazy: () => import('@/features/Events/Events.page'),
          },
          {
            path: ROUTES.EVENT,
            lazy: () => import('@/features/Event/Event.page'),
          }
        ],
      },
      {
        element: <AppHeader />,
        children: [
          {
            path: ROUTES.HOME,
            lazy: () => import('@/features/HomePage/Home.page'),
          },
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
        path: ROUTES.CREATE_EVENT,
        lazy: () => import('@/features/CreateEvent/CreateEvent.page'),
      },
      {
        path: ROUTES.PROFILE,
        lazy: () => import('@/features/Profile/Profile.page'),
      },
    ],
  },
]);
