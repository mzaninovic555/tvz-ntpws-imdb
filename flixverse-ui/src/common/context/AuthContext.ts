import {AuthenticationInfo} from '../authentication/AuthenticationInfo.ts';
import {createContext, useContext} from 'react';

export type AuthContextType = {
  authInfo: AuthenticationInfo,
  setToken: (token?: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  authInfo: {authenticated: false},
  setToken: () => {}
});

const useAuth = () => {
  const val = useContext(AuthContext);
  if (!val) {
    throw new Error('AuthContext Provider is required');
  }
  return val;
};

export default useAuth;
