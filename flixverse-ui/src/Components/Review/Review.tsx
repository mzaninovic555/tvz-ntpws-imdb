import {useEffect, useState} from 'react';
import {ReviewResponse} from './ReviewResponse.ts';
import {getReviewsForItem} from './ReviewApi.ts';
import ItemType from '../../common/enums/ItemType.ts';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Button} from 'primereact/button';
import {Accordion, AccordionTab} from 'primereact/accordion';
import Markdown from 'react-markdown';
import {Rating} from 'primereact/rating';

type ReviewProps = {
  itemId: number,
  itemType: ItemType
};

const Review = (props: ReviewProps) => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetchReviews();
  }, [page, props.itemId]);

  const fetchReviews = async () => {
    setLoading(true);
    const res = await getReviewsForItem(page, props.itemId, props.itemType);
    if (!res) {
      return;
    }
    setReviews(res);
    setLoading(false);
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
      {loading && <ProgressSpinner />}
      {!loading && reviews.length == 0 && <h2 className='text-primary-900'>No reviews found</h2> }
      {!loading && reviews.length > 0 &&
        <div className='container-70'>
          <h2 className='text-primary-900'>Reviews</h2>
          <Accordion activeIndex={0} multiple className='mb-2'>
            {reviews.map((review, i) =>
              <AccordionTab key={review.id + review.authorUsername + i} header={headerTemplate(review)}>
                <Markdown>{review.text}</Markdown>
              </AccordionTab>
            )}
          </Accordion>
          <Button className='w-2 mb-4 mr-2' label='Load previous' disabled={loading || page == 0} onClick={() => setPage(page - 1)} />
          <Button className='w-2 mb-4' label='Load next' disabled={loading || reviews.length < 10} onClick={() => setPage(page + 1)} />
        </div>
      }
    </>
  );
};

export default Review;
