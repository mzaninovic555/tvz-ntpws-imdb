import {useEffect, useState} from 'react';
import {GenericItemResponse} from '../../common/response/GenericItemResponse.ts';
import {Carousel, CarouselResponsiveOption} from 'primereact/carousel';
import {getPopularActors, getPopularMovies, getPopularShows} from './HomeService.ts';
import {useNavigate} from 'react-router-dom';
import './home.css';
import ItemType from '../../common/enums/ItemType.ts';
import GenericSkeleton from '../../Components/GenericSkeleton.tsx';


const Home = () => {
  const [popularMovies, setPopularMovies] = useState<GenericItemResponse[] | undefined>(undefined);
  const [popularShows, setpopularShows] = useState<GenericItemResponse[] | undefined>(undefined);
  const [popularActors, setpopularActors] = useState<GenericItemResponse[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    void fetchPopularMovies();
    void fetchPopularShows();
    void fetchPopularActors();
    setLoading(false);
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

  const naviagateToType = (type: ItemType, movieId: number) => {
    let prefix = '';
    switch (type) {
      case ItemType.Movie:
        prefix = 'movies';
        break;
      case ItemType.Show:
        prefix = 'tv-shows';
        break;
    }
    navigate(`/${prefix}/${movieId}`);
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

  const carouselItemTemplate = (type: ItemType, item: GenericItemResponse) => {
    return (
      <div className='border-1 surface-border m-2 cursor-pointer carousel-item text-center pb-3'
        onClick={() => naviagateToType(type, item.id)}>
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
    <>
      {loading && <GenericSkeleton />}
      {!loading &&
        <main className='container mt-5 text-left'>
          <section>
            <h2 className='text-primary'>Popular movies</h2>
            {!popularMovies && <div>mashallah he is not loaded</div>}
            {popularMovies && <Carousel value={popularMovies}
              itemTemplate={(item: GenericItemResponse) => carouselItemTemplate(ItemType.Movie, item)}
              responsiveOptions={carouselResponsiveOptions} circular />}
          </section>
          <section>
            <h2 className='text-primary'>Popular shows</h2>
            {!popularShows && <div>mashallah he is not loaded</div>}
            {popularShows && <Carousel value={popularShows}
              itemTemplate={(item: GenericItemResponse) => carouselItemTemplate(ItemType.Show, item)}
              responsiveOptions={carouselResponsiveOptions} circular />}
          </section>
          <section>
            <h2 className='text-primary'>Popular actors</h2>
            {!popularActors && <div>mashallah he is not loaded</div>}
            {popularActors && <Carousel value={popularActors}
              itemTemplate={(item: GenericItemResponse) => carouselItemTemplate(ItemType.Person, item)}
              responsiveOptions={carouselResponsiveOptions} circular />}
          </section>
        </main>}
    </>);
};

export default Home;
