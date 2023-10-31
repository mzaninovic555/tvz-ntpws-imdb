import {Route, Routes} from 'react-router-dom';
import Login from '../Views/Login/Login.tsx';
import Register from '../Views/Register/Register.tsx';
import Home from '../Views/Home/Home.tsx';
import BaseSearch from '../Views/Search/BaseSearch.tsx';
import ItemType from '../common/enums/ItemType.ts';
import SeriesDetails from '../Views/SeriesDetails/SeriesDetails.tsx';
import MovieDetails from '../Views/MovieDetails/MovieDetails.tsx';
import Watchlist from '../Views/Watchlist/Watchlist.tsx';

const RoutesConfig = () => {
  return (
    <Routes>
      {[
        <Route path='/' key='home' element={<Home />} />,
        <Route path='/login' element={<Login />} key='login' />,
        <Route path='/register' element={<Register />} key='register' />,
        <Route path='/movies' key='movie'>
          <Route index element={<BaseSearch type={ItemType.Movie} />} />
          <Route path=':movieId' element={<MovieDetails />} />
        </Route>,
        <Route path='/tv-shows' key='series'>
          <Route index element={<BaseSearch type={ItemType.Show} />} />
          <Route path=':seriesId' element={<SeriesDetails />} />
        </Route>,
        <Route path='/watchlist' element={<Watchlist />} key='watchlist' />
      ]}

    </Routes>);
};

export default RoutesConfig;
