import {useEffect, useState} from 'react';
import {getWatchlist} from './WatchlistApi.ts';
import {ProgressSpinner} from 'primereact/progressspinner';
import {DataView} from 'primereact/dataview';
import {Button} from 'primereact/button';
import {UserWatchlistItem} from './UserWatchlist.ts';
import {TmdbConst} from '../../common/TmdbConst.ts';

const Watchlist = () => {
  const [watchlistItems, setWatchlistItems] = useState<UserWatchlistItem[]>();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => void fetchWatchlistItems(), [page]);

  const fetchWatchlistItems = async () => {
    setLoading(true);

    const res = await getWatchlist(page).catch();
    if (!res) {
      return;
    }
    setWatchlistItems(res);
    setLoading(false);
  };

  const itemTemplate = (item: UserWatchlistItem) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${item.posterPath}`} alt={item.title} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{item.title}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading && <ProgressSpinner />}
      {!loading &&
        <div className='container'>
          <DataView itemTemplate={itemTemplate} value={watchlistItems} />
          <Button className='mr-2' label='Previous page' disabled={page == 0} onClick={() => setPage(page - 1)} />
          <Button label='Next page' onClick={() => setPage(page + 1)} />
        </div>}
    </>
  );
};

export default Watchlist;
