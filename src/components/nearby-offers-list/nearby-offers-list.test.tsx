import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {withHistory, withStore} from '../../utils/mock-component';
import NearbyOffersList from './nearby-offers-list';
import {makeFakeOffer, makeFakeStore} from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

describe('NearbyOffersList Component', () => {
  const mockHistory = createMemoryHistory();

  it('should render the section title correctly', () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const withHistoryComponent = withHistory(
      <NearbyOffersList offers={mockOffers} />,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          email: null,
          avatarUrl: null,
        },
        OFFERS: {
          offers: mockOffers,
          favorites: [],
          isLoading: false,
          favoritesCount: 0,
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('should render multiple offers when passed', () => {
    const mockOffers = [
      makeFakeOffer(),
      makeFakeOffer(),
      makeFakeOffer()
    ];

    const withHistoryComponent = withHistory(
      <NearbyOffersList offers={mockOffers} />,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          email: null,
          avatarUrl: null,
        },
        OFFERS: {
          offers: mockOffers,
          favorites: [],
          isLoading: false,
          favoritesCount: 0,
        }
      })
    );

    render(withStoreComponent);

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should render nothing when no offers are passed', () => {
    const mockOffers: [] = [];

    const withHistoryComponent = withHistory(
      <NearbyOffersList offers={mockOffers} />,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          email: null,
          avatarUrl: null,
        },
        OFFERS: {
          offers: mockOffers,
          favorites: [],
          isLoading: false,
          favoritesCount: 0,
        }
      })
    );

    const { container } = render(withStoreComponent);

    // The section should still exist, but effectively be empty
    const section = container.querySelector('.near-places');
    expect(section).toBeInTheDocument();
  });

  it('should render with correct section structure', () => {
    const mockOffers = [makeFakeOffer()];

    const withHistoryComponent = withHistory(
      <NearbyOffersList offers={mockOffers} />,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          email: null,
          avatarUrl: null,
        },
        OFFERS: {
          offers: mockOffers,
          favorites: [],
          isLoading: false,
          favoritesCount: 0,
        }
      })
    );

    const { container } = render(withStoreComponent);

    const section = container.querySelector('.near-places');
    const title = container.querySelector('.near-places__title');

    expect(section).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('Other places in the neighbourhood');
  });
});
