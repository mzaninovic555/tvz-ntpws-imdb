import ItemType from '../../common/enums/ItemType.ts';
import {DataView} from 'primereact/dataview';
import {useEffect, useState} from 'react';
import {GenericItemResponse} from '../../common/response/GenericItemResponse.ts';
import {getMoviesSearch, getShowsSearch} from './SearchApi.ts';
import {useNavigate} from 'react-router-dom';
import './search.css';

type SearchProps = {
  type: ItemType
}

const BaseSearch = (props: SearchProps) => {
  const [searchItems, setSearchItems] = useState<GenericItemResponse[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    switch (props.type) {
      case ItemType.Movie:
        void fetchMoviesSearch();
        break;
      case ItemType.Show:
        void getShowSearch();
        break;
    }
  }, []);

  const fetchMoviesSearch = async () => {
    const res = await getMoviesSearch().catch(); // TODO: error handling
    if (!res) {
      return;
    }
    setSearchItems(res);
  };

  const getShowSearch = async () => {
    const res = await getShowsSearch().catch(); // TODO: error handling
    if (!res) {
      return;
    }
    setSearchItems(res);
  };

  const naviagateToType = (movieId: number) => {
    let prefix = '';
    switch (props.type) {
      case ItemType.Movie:
        prefix = 'movies';
        break;
      case ItemType.Show:
        prefix = 'tv-shows';
        break;
    }
    navigate(`/${prefix}/${movieId}`);
  };

  const searchItemTemplate = (item: GenericItemResponse) => {
    return (
      <div className="search-item-container sm:col-6 md:col-4 lg:col-2 pb-2 m-2 cursor-pointer shadow-3 border-round"
        onClick={() => naviagateToType(item.id)}>
        <div className="flex flex-column align-items-center">
          <img className="w-12 shadow-2 border-round" src={item.poster} alt={item.name} />
          <h4 className="">{item.name}</h4>
        </div>
      </div>
    );
  };

  return (
    <>
      {searchItems &&
        <DataView className='container' value={searchItems} itemTemplate={searchItemTemplate} layout='grid' />
      }
    </>);
};

export default BaseSearch;
