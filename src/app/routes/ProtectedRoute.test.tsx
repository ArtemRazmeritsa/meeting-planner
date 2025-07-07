import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProtectedRoute from './ProtectedRoute';
import { User } from 'firebase/auth';
import { useAuthStore } from '@/shared/global-stores/auth/use-auth-store';
import { render, screen } from '@testing-library/react';
import { ROUTES } from '@/shared/config/routes';

const mockUser = {
  uid: '123',
  email: 'test@test.com',
} as unknown as User;

vi.mock('react-router-dom', () => ({
  Outlet: () => <div>Outlet</div>,
  Navigate: ({ to }: { to: string }) => <div>Navigate to {to}</div>,
  useLocation: vi.fn(() => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  })),
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('рендерит Outlet если пользователь авторизован', () => {
    useAuthStore.setState({ user: mockUser, isLoading: false });
    render(<ProtectedRoute />);
    expect(screen.getByText('Outlet')).toBeTruthy();
  });
  it('пенренаправляет на страницу логина если пользователь не авторизован', () => {
    useAuthStore.setState({ user: null, isLoading: false });
    render(<ProtectedRoute />);
    expect(screen.getByText(`Navigate to ${ROUTES.LOGIN}`)).toBeTruthy();
  });
});
