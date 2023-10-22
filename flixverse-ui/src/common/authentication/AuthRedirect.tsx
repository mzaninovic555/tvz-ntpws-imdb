import {JSXChildrenProps} from '../../@types';
import useAuth from '../context/AuthContext.ts';
import {Navigate} from 'react-router-dom';

const AuthRedirect = (props: JSXChildrenProps & {sendToHome: boolean, customRedirect?:string}) => {
  const {authInfo} = useAuth();
  const targetLocation = (props.customRedirect || '/');

  if (authInfo.authenticated && props.sendToHome) {
    return <Navigate to={targetLocation} replace={true} />;
  }

  if (!authInfo.authenticated && !props.sendToHome) {
    return <Navigate to={'/login'} replace={true} />;
  }

  return props.children;
};

export default AuthRedirect;
