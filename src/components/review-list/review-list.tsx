import {Review} from '../../types/review.ts';
import ReviewItem from '../review-item/review-item.tsx';

type ReviewsListProps = {
  reviews: Review[] | undefined;
};

function ReviewList({reviews}: ReviewsListProps): JSX.Element{
  if (!reviews){
    return <p style={{ textAlign: 'center', fontSize: '32px' }}>No reviews available</p>;
  }

  const sortedReviews = reviews
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <ReviewItem key={review.id} review={review}/>
      ))}
    </ul>
  );
}

export default ReviewList;