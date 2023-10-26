import {useEffect, useState} from 'react';
import {GenericItemCarouselResponse} from './GenericItemCarouselResponse.ts';
import {Carousel} from 'primereact/carousel';
import {getPopularActors, getPopularMovies, getPopularShows} from './HomeService.ts';
import {useNavigate} from 'react-router-dom';
import './home.css';


const Home = () => {
  const [popularMovies, setPopularMovies] = useState<GenericItemCarouselResponse[]>([]);
  const [popularShows, setpopularShows] = useState<GenericItemCarouselResponse[]>([]);
  const [popularActors, setpopularActors] = useState<GenericItemCarouselResponse[]>([]);


  const navigate = useNavigate();

  useEffect(() => {
    void fetchPopularMovies();
    void fetchPopularShows();
    void fetchPopularActors();
  }, []);

  const fetchPopularMovies = async () => {
    const res = await getPopularMovies().catch(); // TODO: error
    if (!res) {
      return;
    }
    setPopularMovies(res);
  };

  const fetchPopularShows = async () => {
    const res = await getPopularShows().catch(); // TODO: error
    if (!res) {
      return;
    }
    setpopularShows(res);
  };

  const fetchPopularActors = async () => {
    const res = await getPopularActors().catch(); // TODO: error
    if (!res) {
      return;
    }
    setpopularActors(res);
  };

  const navigateToMovie = () => {
    // TODO: add url
    navigate('/');
  };

  const carouselItemTemplate = (item: GenericItemCarouselResponse) => {
    return (
      <div className='border-1 surface-border m-2 cursor-pointer carousel-item text-center'
        onClick={() => navigateToMovie()}>
        <div className="">
          <img src={`${item.poster}`} alt={item.name} className="carousel-image" />
        </div>
        <div className='h-3rem'>
          <h4 className="text-primary ">{item.name}</h4>
        </div>
      </div>
    );
  };

  return (
    <main className='container mt-5 text-left'>
      <section>
        <h2 className='text-primary'>Popular movies</h2>
        {popularMovies && <Carousel value={popularMovies} itemTemplate={carouselItemTemplate} numVisible={6} numScroll={3}/>}
      </section>
      <section>
        <h2 className='text-primary'>Popular shows</h2>
        {popularMovies && <Carousel value={popularShows} itemTemplate={carouselItemTemplate} numVisible={6} numScroll={3}/>}
      </section>
      <section>
        <h2 className='text-primary'>Popular actors</h2>
        {popularMovies && <Carousel value={popularActors} itemTemplate={carouselItemTemplate} numVisible={6} numScroll={3}/>}
      </section>
    </main>);
};

export default Home;
