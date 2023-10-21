import api from '../../common/api/api.ts';

export type RegisterResponse = {
  message?: string
};

export async function registerApi(username: string, password: string, email: string): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>('/register', {username, password, email});
  return response?.data;
}
