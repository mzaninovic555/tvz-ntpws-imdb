import {TmdbConst} from '../common/TmdbConst.ts';
import './castCarousel.css';
import {CrewType} from '../Views/Common/CrewType.ts';

type CastCarouselProps = {
  cast?: CrewType[]
};

const CastCarousel = (props: CastCarouselProps) => {
  return (
    <>
      {props.cast && props.cast.length > 0 &&
        <section className='container-70 border-bottom-1 text-left'>
          <h2 className='text-800 mb-0'>Cast</h2>
          <div className='white-space-nowrap overflow-x-auto '>
            <ul className='px-0 mb-5'>
              {props.cast.map((c) =>
                <li key={c.id} className='inline-block mr-4 pb-3 shadow-3 text-center border-round'>
                  <div className='flex flex-column movie-cast-container'>
                    <img className='movie-cast-image mb-2 border-round' src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${c.profilePath}`} alt={`${c.name}`}/>
                    <h5 className='text-900 white-space-normal'>{c.name}</h5>
                    <h6 className='text-700 white-space-normal my-1'>{c?.character}</h6>
                  </div>
                </li>)
              }
            </ul>
          </div>
        </section>}
      {!props.cast || props.cast.length <= 0 && <h2 className='text-800 text-center'>No cast found</h2>}
    </>
  );
};

export default CastCarousel;
