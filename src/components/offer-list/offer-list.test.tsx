import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import MemoizedOfferList from './offer-list';
import { store } from '../../store'; // Adjust the import to your store location
import { vi } from 'vitest';

describe('OfferList Component', () => {
  const renderWithProvider = (ui: React.ReactElement) =>
    render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    );

  it('should render offers correctly', () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

    renderWithProvider(<MemoizedOfferList offers={mockOffers} />);

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should call onOfferHover when an offer is hovered', async () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const handleOfferHover = vi.fn();
    const user = userEvent.setup();

    renderWithProvider(<MemoizedOfferList offers={mockOffers} onOfferHover={handleOfferHover} />);

    const firstOffer = screen.getByText(mockOffers[0].title);
    await user.hover(firstOffer);

    expect(handleOfferHover).toHaveBeenCalledWith(mockOffers[0]);

    await user.unhover(firstOffer);

    expect(handleOfferHover).toHaveBeenCalledWith(null);
  });

  it('should render empty list when no offers are provided', () => {
    renderWithProvider(<MemoizedOfferList offers={[]} />);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
