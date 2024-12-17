import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemoizedReviewList from './review-list';
import { makeFakeReview } from '../../utils/mocks';

describe('ReviewList Component', () => {
  it('should render "Be the first to review" when there are no reviews', () => {
    render(<MemoizedReviewList reviews={[]} />);
    expect(screen.getByText('Be the first to review')).toBeInTheDocument();
  });

  it('should render a list of reviews when reviews are provided', () => {
    const reviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];

    render(<MemoizedReviewList reviews={reviews} />);

    reviews.forEach((review) => {
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
      expect(screen.getByText(review.comment)).toBeInTheDocument();
      const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });

      expect(screen.getAllByText(formattedDate, { selector: 'time' })).toHaveLength(3);
    });
  });


  it('should render at most 10 reviews sorted by date in descending order', () => {
    const reviews = Array.from({ length: 12 }, () => makeFakeReview());
    const sortedReviews = [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    render(<MemoizedReviewList reviews={reviews} />);

    sortedReviews.forEach((review) => {
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
      expect(screen.getByText(review.comment)).toBeInTheDocument();

      const reviewDateElements = screen.queryAllByText(new Date(review.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      }));
      expect(reviewDateElements.length).toBeGreaterThan(0);
    });

    expect(screen.queryAllByRole('listitem')).toHaveLength(10);
  });

});
