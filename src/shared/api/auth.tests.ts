import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { login, logout, register } from './auth';

const mockResult: UserCredential = {
  user: {
    uid: '123',
    email: 'test@test.com',
  } as unknown as User,
  providerId: 'password',
  operationType: 'signIn',
};

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

describe('register', () => {
  const mockCreateUser = vi.mocked(createUserWithEmailAndPassword);
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('вызывает createUserWithEmailAndPassword с правильными аргументами', async () => {
    mockCreateUser.mockResolvedValue(mockResult);
    const email = 'test@test.com';
    const password = '123456';
    const result = await register(email, password);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toHaveBeenCalledWith(
      expect.anything(),
      email,
      password,
    );
    expect(result).toBe(mockResult);
  });

  it('выбрасывает ошибку, если пользователь не создан', async () => {
    const errorMessage = 'Ошибка регистрации';
    mockCreateUser.mockRejectedValue(new Error(errorMessage));
    await expect(register('test@test.com', '123456')).rejects.toThrow(
      errorMessage,
    );
  });
});

describe('login', () => {
  const mockLoginUser = vi.mocked(signInWithEmailAndPassword);
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('вызывает signInWithEmailAndPassword с правильными аргументами', async () => {
    mockLoginUser.mockResolvedValue(mockResult);
    const email = 'test@test.com';
    const password = '123456';
    const result = await login(email, password);
    expect(mockLoginUser).toHaveBeenCalledTimes(1);
    expect(mockLoginUser).toHaveBeenCalledWith(
      expect.anything(),
      email,
      password,
    );
    expect(result).toBe(mockResult);
  });

  it('выбрасывает ошибку, если пользователь не залогинен', async () => {
    const errorMessage = 'Ошибка входа';
    mockLoginUser.mockRejectedValue(new Error(errorMessage));
    await expect(login('test@test.com', '123456')).rejects.toThrow(
      errorMessage,
    );
  });
});

describe('logout', () => {
  const mockLogoutUser = vi.mocked(signOut);
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('успешно выполняет выход', async () => {
    mockLogoutUser.mockResolvedValueOnce();
    await logout();
    expect(mockLogoutUser).toHaveBeenCalledTimes(1);
    expect(mockLogoutUser).toHaveBeenCalledWith(expect.anything());
  });

  it('выбрасывает ошибку при неудачном выходе', async () => {
    const errorMessage = 'Ошибка выхода';
    mockLogoutUser.mockRejectedValue(new Error(errorMessage));
    await expect(logout).rejects.toThrow(errorMessage);
  });
});
