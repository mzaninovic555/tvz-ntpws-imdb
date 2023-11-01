import {useEffect, useState} from 'react';
import {JSXChildrenProps} from '../../@types';
import {AuthContext} from '../context/AuthContext.ts';
import api from '../api/api.ts';
import {AuthenticationInfo} from './AuthenticationInfo.ts';
import {extractJwtData, getAuthenticationInfoFromJwt} from './AuthUtils.ts';
import Cookies from 'universal-cookie';

const AuthWrapper = (props: JSXChildrenProps) => {
  const cookies = new Cookies();
  const [token, setToken] = useState<string | undefined | null>(() => {
    const token = cookies.get('flixverse-jwt-token') as string | null;
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return token;
  });

  const initAuthenticationInfo = () => {
    if (!token) {
      return {authenticated: false};
    }

    const extracted = extractJwtData(token);
    return !extracted ? {authenticated: false} : getAuthenticationInfoFromJwt(extracted);
  };

  const [authInfo, setAuthInfo] = useState<AuthenticationInfo>(initAuthenticationInfo());

  useEffect(() => setAuthInfo(initAuthenticationInfo()), [token]);

  const setTokenIntercept = (token?: string) => {
    const extracted = extractJwtData(token);
    if (!token) {
      cookies.remove('flixverse-jwt-token');
      api.defaults.headers.common['Authorization'] = undefined;
    } else {
      cookies.set('flixverse-jwt-token', token, {expires: new Date(extracted!.exp * 1000)});
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{setToken: setTokenIntercept, authInfo: authInfo}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
