import {Route, Routes} from 'react-router-dom';
import Login from '../Views/Login/Login.tsx';
import Register from '../Views/Register/Register.tsx';
import Home from '../Views/Home/Home.tsx';
import MovieDetails from '../Views/MovieDetails/MovieDetails.tsx';
import SeriesDetails from '../Views/SeriesDetails/SeriesDetails.tsx';

const RoutesConfig = () => {
  return (
    <Routes>
      {[
        <Route path='/' key='home' element={<Home />} />,
        <Route path='/login' element={<Login />} key='login' />,
        <Route path='/register' element={<Register />} key='register' />,
        <Route path='/movie' key='movie'>
          <Route index />
          <Route path=':movieId' element={<MovieDetails />} />
        </Route>,
        <Route path='/series' key='series'>
          <Route index />
          <Route path=':seriesId' element={<SeriesDetails />} />
        </Route>
      ]}

    </Routes>);
};

export default RoutesConfig;
