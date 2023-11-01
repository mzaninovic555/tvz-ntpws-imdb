import {useEffect, useState} from 'react';
import {
  getCompleted,
  getWatchlist,
  removeEntryFromWatchlist,
  setEntryAsCompleted, setEntryInWatching
} from './WatchlistApi.ts';
import {ProgressSpinner} from 'primereact/progressspinner';
import {DataView} from 'primereact/dataview';
import {Button} from 'primereact/button';
import {UserWatchlistItem} from './UserWatchlist.ts';
import {TmdbConst} from '../../common/TmdbConst.ts';
import ItemType from '../../common/enums/ItemType.ts';
import {useNavigate} from 'react-router-dom';
import useToast from '../../common/context/ToastContext.ts';
import {createNewToast} from '../../common/messages/toastUtils.ts';
import {AxiosError} from 'axios';
import {BasicResponse} from '../../common/response/BasicResponse.ts';

type WatchlistItemType = {
  type: 'inProgress' | 'completed';
}

const Watchlist = (props: WatchlistItemType) => {
  const [watchlistItems, setWatchlistItems] = useState<UserWatchlistItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => void fetchWatchlistItems(), [page, props.type]);

  const fetchWatchlistItems = async () => {
    setLoading(true);

    let res;
    if (props.type == 'inProgress') {
      res = await getWatchlist(page).catch();
    } else {
      res = await getCompleted(page).catch();
    }

    if (!res) {
      return;
    }
    setWatchlistItems(res);
    setLoading(false);
  };

  const naviagateToType = (itemId: number, type: ItemType) => {
    let prefix = '';
    switch (type) {
      case ItemType.Movie:
        prefix = 'movies';
        break;
      case ItemType.Show:
        prefix = 'tv-shows';
        break;
    }
    navigate(`/${prefix}/${itemId}`);
  };

  const setAsCompleted = async (entryId: number) => {
    const res = await setEntryAsCompleted(entryId).catch(handleFailure);
    if (!res) {
      return;
    }
    toast.toast?.current?.show(createNewToast(res.message || 'Set as completed', 'info'));
    setWatchlistItems((prev) => {
      const copy = prev.slice();
      const f = copy.find((c) => c.watchlistItem.id == entryId);
      if (!f) {
        return copy;
      }
      copy.splice(copy.indexOf(f), 1);
      return copy;
    });
  };

  const removeEntry = async (entryId: number) => {
    const res = await removeEntryFromWatchlist(entryId).catch(handleFailure);
    if (!res) {
      return;
    }
    toast.toast?.current?.show(createNewToast(res.message || 'Entry removed', 'info'));
    setWatchlistItems((prev) => {
      const copy = prev.slice();
      const f = copy.find((c) => c.watchlistItem.id == entryId);
      if (!f) {
        return copy;
      }
      copy.splice(copy.indexOf(f), 1);
      return copy;
    });
  };

  const setAsInProgress = async (entryId: number) => {
    const res = await setEntryInWatching(entryId).catch(handleFailure);
    if (!res) {
      return;
    }
    toast.toast?.current?.show(createNewToast(res.message || 'Set as in progress', 'info'));
    setWatchlistItems((prev) => {
      const copy = prev.slice();
      const f = copy.find((c) => c.watchlistItem.id == entryId);
      if (!f) {
        return copy;
      }
      copy.splice(copy.indexOf(f), 1);
      return copy;
    });
  };

  const handleFailure = (e: AxiosError<BasicResponse>) => {
    const msg = e.message || '';
    toast.toast?.current?.show(createNewToast(msg, 'error', true));
  };

  const inProgressTemplate = (item: UserWatchlistItem) => {
    return (
      <div className="mx-2 mb-4 sm:col-4 md:col-3 lg:col-2 pb-3 shadow-3 border-round flex flex-column justify-content-center align-items-center">
        <div className="flex flex-column align-items-center search-item-container cursor-pointer"
          onClick={() => naviagateToType(item.watchlistItem.itemId, item.watchlistItem.type)}>
          <img className="w-12 shadow-2 border-round-top"
            src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${item.posterPath}`} alt={item.title} />
          <h4>{item.title}</h4>
        </div>
        <div className='flex'>
          <Button className='mr-3' icon="pi pi-times" rounded severity="danger" aria-label="Cancel"
            onClick={() => removeEntry(item.watchlistItem.id)}/>
          <Button icon="pi pi-check" rounded severity='success' aria-label="Complete"
            onClick={() => setAsCompleted(item.watchlistItem.id)}/>
        </div>
      </div>
    );
  };

  const completedTemplate = (item: UserWatchlistItem) => {
    return (
      <div className="mx-2 mb-4 sm:col-4 md:col-3 lg:col-2 pb-3 shadow-3 border-round flex flex-column justify-content-center align-items-center">
        <div className="flex flex-column align-items-center search-item-container cursor-pointer"
          onClick={() => naviagateToType(item.watchlistItem.itemId, item.watchlistItem.type)}>
          <img className="w-12 shadow-2 border-round-top"
            src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${item.posterPath}`} alt={item.title} />
          <h4>{item.title}</h4>
        </div>
        <div className='flex'>
          <Button className='mr-3' icon="pi pi-times" rounded severity="warning" aria-label="Cancel"
            onClick={() => setAsInProgress(item.watchlistItem.id)}/>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading && <ProgressSpinner />}
      {watchlistItems && !loading &&
          <div className='mt-5'>
            <h2 className='text-primary-900'>{props.type == 'inProgress' ? 'Your watchlist' : 'Your completed list'}</h2>
            <DataView value={watchlistItems} itemTemplate={props.type == 'inProgress' ? inProgressTemplate : completedTemplate} layout='grid' />
            <Button className='w-2 mb-4 mr-2' label='Load previous' disabled={loading || page == 0} onClick={() => setPage(page - 1)} />
            <Button className='w-2 mb-4' label='Load next' disabled={loading || watchlistItems.length < 5} onClick={() => setPage(page + 1)} />
          </div>
      }
    </>
  );
};

export default Watchlist;
