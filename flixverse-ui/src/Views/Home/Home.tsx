import {useEffect, useState} from 'react';
import {GenericItemCarouselResponse} from './GenericItemCarouselResponse.ts';
import {Carousel, CarouselResponsiveOption} from 'primereact/carousel';
import {getPopularActors, getPopularMovies, getPopularShows} from './HomeService.ts';
import {useNavigate} from 'react-router-dom';
import './home.css';


const Home = () => {
  const [popularMovies, setPopularMovies] = useState<GenericItemCarouselResponse[] | undefined>(undefined);
  const [popularShows, setpopularShows] = useState<GenericItemCarouselResponse[] | undefined>(undefined);
  const [popularActors, setpopularActors] = useState<GenericItemCarouselResponse[] | undefined>(undefined);


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

  const navigateToMovie = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const carouselResponsiveOptions: CarouselResponsiveOption[] = [
    {
      numVisible: 6,
      breakpoint: '10000px',
      numScroll: 6
    },
    {
      numVisible: 3,
      breakpoint: '1500px',
      numScroll: 3
    },
    {
      numVisible: 2,
      breakpoint: '1100px',
      numScroll: 2
    }
  ];

  const carouselItemTemplate = (item: GenericItemCarouselResponse) => {
    return (
      <div className='border-1 surface-border m-2 cursor-pointer carousel-item text-center pb-3 h-28rem'
        onClick={() => navigateToMovie(item.id)}>
        <div>
          <img src={`${item.poster}`} alt={item.name} className="carousel-image" />
        </div>
        <div>
          <h4 className="text-primary text-overflow-ellipsis">{item.name}</h4>
        </div>
      </div>
    );
  };

  return (
    <main className='container mt-5 text-left'>
      <section>
        <h2 className='text-primary'>Popular movies</h2>
        {!popularMovies && <div>mashallah he is not loaded</div>}
        {popularMovies && <Carousel value={popularMovies} itemTemplate={carouselItemTemplate}
          responsiveOptions={carouselResponsiveOptions} circular />}
      </section>
      <section>
        <h2 className='text-primary'>Popular shows</h2>
        {!popularShows && <div>mashallah he is not loaded</div>}
        {popularShows && <Carousel value={popularShows} itemTemplate={carouselItemTemplate}
          responsiveOptions={carouselResponsiveOptions} circular />}
      </section>
      <section>
        <h2 className='text-primary'>Popular actors</h2>
        {!popularActors && <div>mashallah he is not loaded</div>}
        {popularActors && <Carousel value={popularActors} itemTemplate={carouselItemTemplate}
          responsiveOptions={carouselResponsiveOptions} circular />}
      </section>
    </main>);
};

export default Home;
