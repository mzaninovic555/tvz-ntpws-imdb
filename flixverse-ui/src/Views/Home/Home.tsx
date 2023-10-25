import {useEffect, useState} from 'react';
import {MoviePopular} from './MoviePopular.ts';
import {Carousel} from 'primereact/carousel';
import {getPopularMovies} from './HomeService.ts';


const Home = () => {
  const [popularMovies, setPopularMovies] = useState<MoviePopular[]>([]);

  useEffect(() => {
    void fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    const res = await getPopularMovies().catch(); // TODO: error
    console.log(res)
    if (!res) {
      return;
    }
    setPopularMovies(res);
  };

  const movieTemplate = (movie: MoviePopular) => {
    return (
      <div className='border-1 surface-border border-round m-2 text-center py-5 px-3'>
        <div className="mb-3">
          <img src={`${movie.coverImage}`} alt={movie.title} className="w-10rem" />
        </div>
        <div>
          <h4 className="mb-1">{movie.title}</h4>
        </div>
      </div>
    );
  };

  return (
    <main className='container'>
      <section>
        {popularMovies && <Carousel value={popularMovies} itemTemplate={movieTemplate} numVisible={6} numScroll={3}/>}
      </section>
    </main>);
};

export default Home;
