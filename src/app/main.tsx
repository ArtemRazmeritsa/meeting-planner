import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router.tsx';
import AuthInit from '@/shared/global-stores/auth/AuthInit.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthInit />
    <RouterProvider router={router} />
  </StrictMode>
);
