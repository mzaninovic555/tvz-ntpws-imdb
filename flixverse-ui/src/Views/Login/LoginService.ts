import api from '../../common/api/api.ts';

export type LoginResponse = {
  token?: string,
  message?: string
}

export async function loginApi(usernameOrEmail: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/login', {usernameOrEmail, password});
  return response?.data;
}
