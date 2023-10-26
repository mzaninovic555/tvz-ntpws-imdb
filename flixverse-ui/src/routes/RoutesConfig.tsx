import {Route, Routes} from 'react-router-dom';
import {ReactElement} from 'react';
import useAuth from '../common/context/AuthContext.ts';
import Login from '../Views/Login/Login.tsx';
import Register from '../Views/Register/Register.tsx';
import Home from '../Views/Home/Home.tsx';
import MovieDetails from '../Views/MovieDetails/MovieDetails.tsx';

const RoutesConfig = () => {
  const {authInfo} = useAuth();
  const publicRoutes: ReactElement[] = [
  ];

  const onlyNonAuthenticatedRoutes: ReactElement[] = [
    <Route path='/' key='home' element={<Home />} />,
    <Route path='/login' element={<Login />} key='login' />,
    <Route path='/register' element={<Register />} key='register' />,
    <Route path='/movie' key='movie'>
      <Route index />
      <Route path=':movieId' element={<MovieDetails />} />
    </Route>
  ];

  const authenticatedRoutes: ReactElement[] = [

  ];

  return (
    <Routes>
      {[
        ...publicRoutes,
        ...(!authInfo.authenticated ? onlyNonAuthenticatedRoutes : []),
        ...authenticatedRoutes
      ]}

    </Routes>);
};

export default RoutesConfig;
