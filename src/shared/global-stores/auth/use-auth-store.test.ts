import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthStore } from './use-auth-store';

const mockUser = {
  uid: '123',
  email: 'test@test.com',
} as unknown as User;

const mockLogout = vi.mocked(signOut);

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(() => ({})),
  set: vi.fn(),
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ user: null, isLoading: true });
  });

  it('logout сбрасывает поле user в null', async () => {
    useAuthStore.setState({ user: mockUser, isLoading: false });
    mockLogout.mockResolvedValueOnce();
    await useAuthStore.getState().logout();

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it('при ошибке signOut не очищает user', async () => {
    const error = new Error('Ошибка выхода');

    mockLogout.mockRejectedValueOnce(error);
    useAuthStore.setState({ user: mockUser });
    await expect(useAuthStore.getState().logout()).rejects.toThrow(error);

    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it('subscribeToAuth обновляет user и isLoading', () => {
    const mockUnsubscribe = vi.fn();
    const mockOnAuthStateChanged = vi.mocked(onAuthStateChanged);

    mockOnAuthStateChanged.mockImplementation((_auth, callback) => {
      if (typeof callback === 'function') {
        callback(mockUser);
      }
      return mockUnsubscribe;
    });

    const unsubscribe = useAuthStore.getState().subscribeToAuth();

    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().isLoading).toBe(false);
    expect(unsubscribe).toBe(mockUnsubscribe);
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  });
});
