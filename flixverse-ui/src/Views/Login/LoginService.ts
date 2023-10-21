import {LoginResponse} from './LoginModel.ts';
import api from '../../common/api/api.ts';

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/login', {username, password});
  return response?.data;
}
