import ItemType from '../../common/enums/ItemType.ts';
import {DataView} from 'primereact/dataview';
import {useEffect, useRef, useState} from 'react';
import {GenericItemResponse} from '../../common/response/GenericItemResponse.ts';
import {getBySearchTerm, getFiltered} from './SearchApi.ts';
import {useNavigate, useSearchParams} from 'react-router-dom';
import './search.css';
import {Button} from 'primereact/button';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Genre} from '../Common/Genre.ts';
import {Calendar} from 'primereact/calendar';
import {Nullable} from 'primereact/ts-helpers';
import {getMovieGenres, getShowGenres} from '../../common/api/GenreService.ts';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';

type SearchProps = {
  type: ItemType
}

export type SearchFilter = {
  releaseDateFrom?: Date,
  releaseDateTo?: Date,
  genres: Genre[]
};

const BaseSearch = (props: SearchProps) => {
  const [searchItems, setSearchItems] = useState<GenericItemResponse[] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);
  const [filterValues, setFilterValues] = useState<SearchFilter>({
    releaseDateFrom: undefined,
    releaseDateTo: undefined,
    genres: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParam, setQueryParam] = useSearchParams();

  const isLoadedBySearchTerm = useRef<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    void fetchGenres();

    const searchTerm = queryParam.get('search') as string | undefined | null;
    if (!searchTerm || searchTerm === '') {
      isLoadedBySearchTerm.current = false;
      void fetchByType();
    } else {
      isLoadedBySearchTerm.current = true;
      setSearchTerm(searchTerm);
      void fetchByTypeWithSearchTerm(searchTerm);
    }
  }, [page, props.type, searchTerm, queryParam]);

  const fetchByType = async () => {
    const res = await getFiltered(props.type, page, filterValues).catch(); // TODO: error handling
    if (!res) {
      return;
    }
    setSearchItems(res);
    setLoading(false);
  };

  const fetchByTypeWithSearchTerm = async (searchTerm: string) => {
    const res = await getBySearchTerm(props.type, page, searchTerm).catch(); // TODO: error handling
    if (!res) {
      return;
    }
    setSearchItems(res);
    setLoading(false);
  };

  const clearFilters = () => {
    setFilterValues({
      releaseDateFrom: undefined,
      releaseDateTo: undefined,
      genres: []
    });
    void fetchByType();
  };

  const fetchGenres = async () => {
    const res = props.type === ItemType.Movie ?
      await getMovieGenres().catch() :
      await getShowGenres().catch();
    if (!res) {
      return;
    }
    setAvailableGenres(res);
  };

  const naviagateToType = (itemId: number) => {
    let prefix = '';
    switch (props.type) {
      case ItemType.Movie:
        prefix = 'movies';
        break;
      case ItemType.Show:
        prefix = 'tv-shows';
        break;
    }
    navigate(`/${prefix}/${itemId}`);
  };

  const loadPrevious = () => {
    if (page == 1) {
      return;
    }
    setPage(page - 1);
  };

  const loadNext = () => {
    setPage(page + 1);
  };

  const setFromDate = (date: Nullable<Date>) => {
    if (!date) {
      return;
    }
    if (filterValues.releaseDateTo && date > filterValues.releaseDateTo) {
      date = filterValues.releaseDateTo;
    }
    setFilterValues({...filterValues, releaseDateFrom: (date)});
  };

  const setToDate = (date: Nullable<Date>) => {
    if (!date) {
      return;
    }
    if (filterValues.releaseDateFrom && date < filterValues.releaseDateFrom) {
      date = filterValues.releaseDateFrom;
    }
    setFilterValues({...filterValues, releaseDateTo: (date)});
  };

  const setFilterGenre = (e: Genre[]) => {
    setFilterValues({...filterValues, genres: (e)});
  };

  const searchItemTemplate = (item: GenericItemResponse) => {
    return (
      <div className="search-item-container mx-2 mb-4 sm:col-4 md:col-3 lg:col-2 pb-2 cursor-pointer shadow-3 border-round"
        onClick={() => naviagateToType(item.id)}>
        <div className="flex flex-column align-items-center">
          <img className="w-12 shadow-2 border-round-top" src={item.poster} alt={item.name} />
          <h4>{item.name}</h4>
        </div>
      </div>
    );
  };

  return (
    <>
      {searchTerm && searchTerm !== '' && <h1 className='text-800'>Results for &quot;{searchTerm}&quot;</h1> }
      {searchTerm == '' && <h1 className='text-800'>Popular {props.type == ItemType.Movie ? 'movies' : 'shows'}</h1>}
      {loading && <ProgressSpinner />}
      {searchItems && !loading &&
        <div className='container'>
          {!isLoadedBySearchTerm.current &&
            <div className='flex justify-content-center mb-4'>
              <Calendar value={filterValues.releaseDateFrom} onChange={(e) => setFromDate(e.value)}
                className='mr-2' placeholder='From date' showIcon />
              <Calendar value={filterValues.releaseDateTo} onChange={(e) => setToDate(e.value)}
                className='mr-2' placeholder='To date' showIcon />
              <MultiSelect placeholder='Filter by genre' className='mr-2 w-2' options={availableGenres} value={filterValues.genres}
                optionLabel='name' onChange={(e: MultiSelectChangeEvent) => setFilterGenre(e.value)} filter />
              <Button label='Search' className='mr-2' onClick={fetchByType} />
              <Button label='Clear' onClick={clearFilters} />
            </div>
          }
          <DataView value={searchItems} itemTemplate={searchItemTemplate} layout='grid' />
          <div>
            <Button className='w-2 mb-4 mr-2' label='Load previous' disabled={loading || page == 1} onClick={loadPrevious} />
            <Button className='w-2 mb-4' label='Load next' disabled={loading} onClick={loadNext} />
          </div>
        </div>
      }
    </>);
};

export default BaseSearch;
