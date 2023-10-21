import {useAuth} from '../common/authentication/AuthWrapper.tsx';
import {Navigate, Outlet} from 'react-router-dom';

export const ProtectedRoute = () => {
  const {token} = useAuth();

  if (!token) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};
