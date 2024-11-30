import {Review} from '../../types/review.ts';
import ReviewItem from '../review-item/review-item.tsx';
import {memo} from "react";

type ReviewsListProps = {
  reviews: Review[] | undefined;
};

function ReviewList({reviews}: ReviewsListProps): JSX.Element{
  if (!reviews || reviews.length === 0){
    return <p style={{textAlign: 'center', fontSize: '32px'}}>Be the first to review</p>;
  }

  const sortedReviews = [...reviews]
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

const MemoizedReviewList = memo(ReviewList, (prevProps, nextProps) => {
  return prevProps.reviews === nextProps.reviews;
});

export default MemoizedReviewList;
