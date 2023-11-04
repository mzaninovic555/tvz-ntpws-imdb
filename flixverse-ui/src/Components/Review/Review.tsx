import {FormEvent, useEffect, useState} from 'react';
import {ReviewResponse} from './ReviewResponse.ts';
import {
  deleteReview,
  getReviewAverageForItem,
  getReviewsForItem,
  updateReview
} from './ReviewApi.ts';
import ItemType from '../../common/enums/ItemType.ts';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Button} from 'primereact/button';
import Markdown from 'react-markdown';
import {Rating, RatingChangeEvent} from 'primereact/rating';
import useAuth from '../../common/context/AuthContext.ts';
import {Panel} from 'primereact/panel';
import {confirmDialog, ConfirmDialog} from 'primereact/confirmdialog';
import useToast from '../../common/context/ToastContext.ts';
import {createNewToast} from '../../common/messages/toastUtils.ts';
import {ReviewRequest} from './ReviewRequest.ts';
import {Dialog} from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import {AxiosError} from 'axios';
import {BasicResponse} from '../../common/response/BasicResponse.ts';

type ReviewProps = {
  itemId: number,
  itemType: ItemType
};

const Review = (props: ReviewProps) => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [authenticatedReview, setAuthenticatedReview] = useState<ReviewResponse | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | undefined>(undefined);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [newReviewGrade, setNewReviewGrade] = useState<number | null>(null);
  const [newReviewText, setNewReviewText] = useState<string | null>(null);

  const [isUpdated, setIsUpdate] = useState<number>(0);

  const auth = useAuth();
  const toast = useToast();

  useEffect(() => {
    void fetchReviews();
    void fetchScore();
  }, [page, props.itemId, isUpdated]);

  const fetchReviews = async () => {
    setLoading(true);
    const res = await getReviewsForItem(page, props.itemId, props.itemType);
    if (!res) {
      return;
    }

    const authItemIndex = res.findIndex((review) => review.authorUsername === auth.authInfo.info?.name);
    if (auth.authInfo.authenticated && authItemIndex !== -1) {
      const authReview = res.splice(authItemIndex, 1);
      setAuthenticatedReview(authReview[0]);
    }

    setReviews(res);
    setLoading(false);
  };

  const fetchScore = async () => {
    const res = await getReviewAverageForItem(props.itemId, props.itemType);
    if (!res) {
      return;
    }
    setScore(res);
  };

  const createUpdateRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authenticatedReview || (!newReviewGrade && !newReviewText)) {
      return;
    }
    await updateReview({
      text: newReviewText ?? authenticatedReview.text,
      grade: newReviewGrade ?? authenticatedReview.grade,
      itemType: authenticatedReview.itemType,
      itemId: authenticatedReview.itemId
    }).catch(handleError);
    setReviewModalVisible(false);
    toast.toast?.current?.show(createNewToast('Review updated', 'info', false, 5000, 'Updated'));
    setIsUpdate(Math.random);
  };

  const clearUpdateState = () => {
    setNewReviewGrade(null);
    setNewReviewText(null);
    setReviewModalVisible(false);
  };

  const showDeleteDialog = () => {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      async accept() {
        await deleteReview(authenticatedReview as ReviewRequest).catch(handleError);
        toast.toast?.current?.show(createNewToast('Review deleted', 'error', false, 5000, 'Deleted'));
        location.reload();
      },
    });
  };

  const handleError = (error: AxiosError<BasicResponse>) => {
    toast.toast?.current?.show(createNewToast(error.message ?? 'An error occured', 'error'));
  };

  const authHeaderTemplate = (review: ReviewResponse) => {
    return (
      <div className="flex align-items-center">
        <i className="pi pi-user mr-2"></i>
        <span className="vertical-align-middle mr-2">{review.authorUsername}</span>
        <Rating className='pr-3 mr-3 border-right-1' value={review.grade} cancel={false} readOnly />
        <div className='flex'>
          <Button icon="pi pi-pencil" severity='secondary' rounded outlined aria-label="Edit" className='h-2rem w-2rem mr-2'
            onClick={() => setReviewModalVisible(true)}/>
          <Button icon="pi pi-trash" severity='danger' rounded outlined aria-label="Filter" className='h-2rem w-2rem'
            onClick={showDeleteDialog}/>
        </div>
      </div>
    );
  };

  const headerTemplate = (review: ReviewResponse) => {
    return (
      <div className="flex align-items-center">
        <i className="pi pi-user mr-2"></i>
        <span className="vertical-align-middle mr-2">{review.authorUsername}</span>
        <Rating value={review.grade} cancel={false} readOnly />
      </div>
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog header="Update your review" visible={reviewModalVisible} className='w-4'
        onHide={clearUpdateState}>
        <form onSubmit={(e) => createUpdateRequest(e)}>
          <Rating value={newReviewGrade ?? authenticatedReview?.grade} required className='mb-2'
            onChange={(e : RatingChangeEvent) => setNewReviewGrade(e.value)} cancel={false} />
          <InputTextarea className='mb-2 w-12' rows={5} cols={40} value={newReviewText ?? authenticatedReview?.text} required
            onChange={(e) => setNewReviewText(e.target.value)} />
          <Button type={'submit'} label='Create review' />
        </form>
      </Dialog>
      {loading && <ProgressSpinner />}
      {!loading && reviews.length == 0 && <h2 className='text-primary-900'>No reviews found</h2> }
      {!loading && reviews.length > 0 &&
        <div className='container-70'>
          <div className='flex mb-2'>
            <h2 className='text-primary-900 pr-4 mr-4 border-right-1'>Reviews</h2>
            <Rating value={score} cancel={false} readOnly />
          </div>
          {authenticatedReview &&
            <Panel className='text-left mb-2' key={authenticatedReview.id + authenticatedReview.authorUsername}
              header={authHeaderTemplate(authenticatedReview)}>
              <Markdown>{authenticatedReview.text}</Markdown>
            </Panel>
          }
          {reviews.map((review, i) =>
            <Panel className='text-left mb-2' key={review.id + review.authorUsername + i} header={headerTemplate(review)}>
              <Markdown>{review.text}</Markdown>
            </Panel>
          )}
          <Button className='w-2 mb-4 mr-2' label='Previous' disabled={loading || page == 0} onClick={() => setPage(page - 1)} />
          <Button className='w-2 mb-4' label='Next' disabled={loading || reviews.length < 5} onClick={() => setPage(page + 1)} />
        </div>
      }
    </>
  );
};

export default Review;
