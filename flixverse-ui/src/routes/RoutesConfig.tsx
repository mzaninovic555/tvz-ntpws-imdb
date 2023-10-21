import {Route, Routes} from 'react-router-dom';
import {ReactElement} from 'react';

const RoutesConfig = () => {
  const publicRoutes: ReactElement[] = [
    <Route path='/home' element={<div>HAHA</div>} key={'home'}/>,
  ];

  const authenticatedRoutes: ReactElement[] = [

  ];

  return (
    <Routes>
      {[
        ...publicRoutes,
        ...authenticatedRoutes
      ]}

    </Routes>);
};

export default RoutesConfig;
