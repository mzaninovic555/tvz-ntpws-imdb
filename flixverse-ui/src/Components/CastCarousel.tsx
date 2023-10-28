import {TmdbConst} from '../common/TmdbConst.ts';
import {CrewType} from '../Views/MovieDetails/MovieDetailsType.ts';
import './castCarousel.css';

type CastCarouselProps = {
  cast: CrewType[]
};

const CastCarousel = (props: CastCarouselProps) => {
  return (
    <section className='container border-bottom-1 text-left'>
      <h2 className='text-800 mb-0'>Cast</h2>
      <div className='white-space-nowrap overflow-x-auto '>
        <ul className='px-0 mb-5'>
          {props.cast.map((c) =>
            <li key={c.id} className='inline-block mr-4 pb-3 shadow-3 text-center border-round'>
              <div className='flex flex-column movie-cast-container'>
                <img className='movie-cast-image mb-1 border-round' src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${c.profilePath}`} alt={`${c.name}`}/>
                <h5 className='text-800'>{c.name}</h5>
              </div>
            </li>)
          }
        </ul>
      </div>
    </section>
  );
};

export default CastCarousel;
