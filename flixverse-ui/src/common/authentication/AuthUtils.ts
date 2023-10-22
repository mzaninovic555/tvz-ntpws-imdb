import {ParsedJwt} from './ParsedJwt.ts';
import {decodeToken, isExpired} from 'react-jwt';
import {AuthenticationInfo} from './AuthenticationInfo.ts';


export const extractJwtData = (token: string): ParsedJwt | null => {
  return isExpired(token) ? null : decodeToken(token) as {name: string, expires: number};
};

export const getAuthenticationInfoFromJwt = (parsedToken: ParsedJwt): AuthenticationInfo => {
  if (!parsedToken.name || !parsedToken.exp) {
    return {authenticated: false};
  }
  return {
    authenticated: true,
    info: {
      name: parsedToken.name,
      exp: parsedToken.exp
    }
  };
};
