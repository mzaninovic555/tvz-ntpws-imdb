
import {Navigate, Outlet} from 'react-router-dom';
import useAuth from '../common/context/AuthContext.ts';

export const ProtectedRoute = () => {
  const {authInfo} = useAuth();

  if (!authInfo.authenticated) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};
