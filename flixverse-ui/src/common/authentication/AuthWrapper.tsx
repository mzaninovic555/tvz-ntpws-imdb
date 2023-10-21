import {useEffect, useState} from 'react';
import {JSXChildrenProps} from '../../@types';
import {AuthContext} from '../context/AuthContext.ts';
import {useCookies} from 'react-cookie';
import api from '../api/api.ts';
import {AuthenticationInfo} from './AuthenticationInfo.ts';
import {extractJwtData, getAuthenticationInfoFromJwt} from './AuthUtils.ts';

const AuthWrapper = (props: JSXChildrenProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['flixverse-jwt-token']);
  const [token, setToken] = useState<string | undefined | null>(() => {
    const token = cookies['flixverse-jwt-token'] as string | null;
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
    if (!token) {
      removeCookie('flixverse-jwt-token');
      api.defaults.headers.common['Authorizationj'] = undefined;
    } else {
      setCookie('flixverse-jwt-token', token, {expires: new Date(new Date().getDate() + 1)});
      api.defaults.headers.common['Authorizationj'] = `Bearer ${token}`;
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
