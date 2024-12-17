import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemoizedReviewItem from './review-item';
import { makeFakeReview } from '../../utils/mocks';

describe('ReviewItem Component', () => {
  it('should render review item correctly', () => {
    const review = makeFakeReview();

    render(<MemoizedReviewItem review={review} />);

    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute('src', review.user.avatarUrl);
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(new Date(review.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    }))).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Rating').previousSibling).toHaveStyle(`width: calc(100% / 5 * ${review.rating})`);
  });
});
