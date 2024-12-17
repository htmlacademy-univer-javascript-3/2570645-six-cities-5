import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import OfferScreen from './offer-screen';
import { AuthorizationStatus, AppRoute, FavouriteStatus } from '../../const';
import * as apiActions from '../../store/api-actions';
import { makeFakeOffer, makeFakeOfferDetail, makeFakeReview, makeFakeStore } from '../../utils/mocks';
import {Review} from '../../types/review.ts';
import {Offer} from '../../types/offer.ts';

vi.mock('../../components/logo/logo', () => ({
  default: () => <div data-testid="logo" />
}));
vi.mock('../../components/header-nav/header-nav', () => ({
  default: () => <div data-testid="header-nav" />
}));
vi.mock('../../components/review-list/review-list', () => ({
  default: ({ reviews }: { reviews: Review[] }) => (
    <div data-testid="review-list">
      {reviews.map((review) => (
        <div key={review.id}>{review.comment}</div>
      ))}
    </div>
  )
}));
vi.mock('../../components/review-form/review-form', () => ({
  default: () => <div data-testid="review-form" />
}));
vi.mock('../../components/map/map', () => ({
  default: () => <div data-testid="map" />
}));
vi.mock('../../components/nearby-offers-list/nearby-offers-list', () => ({
  default: ({ offers }: { offers: Offer[] }) => ( // Явно указываем тип offers
    <div data-testid="nearby-offers-list">
      {offers.map((offer) => (
        <div key={offer.id}>{offer.title}</div>
      ))}
    </div>
  )
}));

describe('OfferScreen Component', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const mockOffer = makeFakeOffer();
  const mockOfferDetail = makeFakeOfferDetail();
  const mockReviews = [makeFakeReview(), makeFakeReview()];
  const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];

  const initialState = makeFakeStore({
    CURRENT_OFFER: {
      offerDetail: mockOfferDetail,
      nearbyOffers: mockNearbyOffers,
      reviews: mockReviews,
      isLoading: false,
    },
    OFFERS: {
      offers: [mockOffer],
      favorites: [],
      isLoading: false,
      favoritesCount: 0,
    },
    USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: null,
      avatarUrl: null,
    },
  });

  const renderComponent = (
    initialEntries = [`/offer/${mockOffer.id}`],
    state = initialState
  ) => {
    const store = mockStore(state);

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <HelmetProvider>
            <Routes>
              <Route path={AppRoute.Offer} element={<OfferScreen />} />
            </Routes>
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders offer details correctly', () => {
    renderComponent();

    expect(screen.getByText(mockOfferDetail.title)).toBeTruthy();
    expect(screen.getByText(`€${mockOfferDetail.price}`)).toBeTruthy();
    expect(screen.getByText(`${mockOfferDetail.bedrooms} Bedrooms`)).toBeTruthy();
    expect(screen.getByText(`Max ${mockOfferDetail.maxAdults} adults`)).toBeTruthy();
  });

  it('displays review list and review count', () => {
    renderComponent();

    expect(screen.getByText(`Reviews · ${mockReviews.length}`)).toBeTruthy();
    expect(screen.getByTestId('review-list')).toBeTruthy();
  });

  it('shows map and nearby offers', () => {
    renderComponent();

    expect(screen.getByTestId('map')).toBeTruthy();
    expect(screen.getByTestId('nearby-offers-list')).toBeTruthy();
  });


  it('shows not found screen for invalid offer', () => {
    const notFoundState = {
      ...initialState,
      OFFERS: {
        offers: [],
        isLoading: false,
        favorites: [],
        favoritesCount: 0,
      },
    };

    renderComponent(['/offer/invalid-id'], notFoundState);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('Oops! Looks like you\'re lost in the city.')
    ).toBeInTheDocument();
  });

  it('changes favourite status when authenticated', () => {
    const changeFavouriteStatusActionMock = vi.spyOn(apiActions, 'changeFavouriteStatusAction');
    const authenticatedState = {
      ...initialState,
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        email: initialState.USER.email,
        avatarUrl: initialState.USER.avatarUrl,
      },
    };

    renderComponent([`/offer/${mockOffer.id}`], authenticatedState);

    const bookmarkButton = screen.getByRole('button', { name: /to bookmarks/i });
    fireEvent.click(bookmarkButton);

    expect(changeFavouriteStatusActionMock).toHaveBeenCalledWith({
      offerId: mockOffer.id,
      status: mockOffer.isFavorite ? FavouriteStatus.Remove : FavouriteStatus.Add,
    });
  });

  it('fetches offer data on mount', () => {
    const fetchOfferDataActionMock = vi.spyOn(apiActions, 'fetchOfferDataAction');

    renderComponent();

    expect(fetchOfferDataActionMock).toHaveBeenCalledWith({ id: mockOffer.id });
  });
});
