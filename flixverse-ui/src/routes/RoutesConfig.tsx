import {Route, Routes} from 'react-router-dom';
import {ReactElement} from 'react';
import {useAuth} from '../provider/AuthWrapper.tsx';

const RoutesConfig = () => {
  const {token} = useAuth();
  const publicRoutes: ReactElement[] = [
    <Route path='/home' element={<div>HAHA</div>} key={'home'}/>,
  ];

  const onlyNonAuthenticatedRoutes: ReactElement[] = [
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
