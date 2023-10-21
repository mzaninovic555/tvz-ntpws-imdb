import {Route, Routes} from 'react-router-dom';
import {ReactElement} from 'react';
import {useAuth} from '../common/authentication/AuthWrapper.tsx';

const RoutesConfig = () => {
  const {token} = useAuth();
  const publicRoutes: ReactElement[] = [
    <Route path='/home' element={<div>HAHA</div>} key={'home'}/>,
  ];

  // TODO elements
  const onlyNonAuthenticatedRoutes: ReactElement[] = [
    <Route path='/' key={'home'} />,
    <Route path='/login' key={'login'} />
  ];

  const authenticatedRoutes: ReactElement[] = [

  ];

  return (
    <Routes>
      {[
        ...publicRoutes,
        ...(!token ? onlyNonAuthenticatedRoutes : []),
        ...authenticatedRoutes
      ]}

    </Routes>);
};

export default RoutesConfig;
