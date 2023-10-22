import {UserInfo} from './UserInfo.ts';

export type AuthenticationInfo = {
  authenticated: boolean,
  info?: UserInfo
}
