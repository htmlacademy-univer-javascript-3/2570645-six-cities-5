import {render, screen} from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import {withHistory, withStore} from '../../utils/mock-component'; // Note: No withHistory here
import {AppRoute, AuthorizationStatus, SortOptions} from '../../const';
import App from './app';
import {makeFakeOffer, makeFakeStore} from '../../utils/mocks';
import {Offer} from '../../types/offer.ts';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render MainScreen with offers when user navigates to "/"', () => {
    const mockOffers = [
      makeFakeOffer(),
      makeFakeOffer(),
      makeFakeOffer(),
    ];

    const cityName = mockOffers[0]?.city?.name || 'Paris';
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          offers: mockOffers,
          favorites: [],
          isLoading: false,
          favoritesCount: 0,
        },
        APP: {
          city: cityName,
          sortOption: SortOptions.Popular,
          error: null,
        },
      })
    );

    mockHistory.push(AppRoute.Main);
    render(withStoreComponent);
    expect(screen.getByText(new RegExp(`places to stay in ${cityName}`, 'i'))).toBeInTheDocument();
  });

  it('should render MainScreen with no offers when user navigates to "/" and no offers available', () => {
    const emptyMockOffers: Offer[] = [];
    const cityName = 'Paris';

    const withHistoryComponent = withHistory(<App />, mockHistory);

    const { withStoreComponent: withEmptyStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          offers: emptyMockOffers,
          favorites: [],
          isLoading: false,
          favoritesCount: 0,
        },
        APP: {
          city: cityName,
          sortOption: SortOptions.Popular,
          error: null,
        },
      })
    );

    mockHistory.push(AppRoute.Main);

    render(withEmptyStoreComponent);
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });


  it('should render LoginScreen when user navigates to "/login"', async () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(await screen.findByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(await screen.findByPlaceholderText(/Password/i)).toBeInTheDocument();
  });


  it('should render FavoritesScreen when user navigates to "/favorites" with no favorite offers', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      },
      OFFERS: {
        offers: [],
        favorites: [],
        isLoading: false,
        favoritesCount: 0,
      },
    }));

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search results/i)).toBeInTheDocument();
  });

  it('should redirect to login if user is not authorized and navigates to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        email: '',
        avatarUrl: '',
      },
      OFFERS: {
        offers: [],
        favorites: [],
        isLoading: false,
        favoritesCount: 0,
      },
    }));

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);
    expect(mockHistory.location.pathname).toBe(AppRoute.Login);
  });


  it('should render FavoritesScreen when user navigates to "/favorites" with favorite offers', () => {
    const favoriteOffer = makeFakeOffer();
    const otherOffer = makeFakeOffer();

    const favoriteOffers = [favoriteOffer];
    const offers = [favoriteOffer, otherOffer];

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      },
      OFFERS: {
        offers: offers,
        favorites: favoriteOffers,
        isLoading: false,
        favoritesCount: favoriteOffers.length,
      },
    }));

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(favoriteOffer.title)).toBeInTheDocument();
    expect(screen.queryByText(otherOffer.title)).not.toBeInTheDocument();
  });


  it('should render LoadingScreen when data is loading', () => {
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Unknown,
          email: '',
          avatarUrl: '',
        },
        OFFERS: {
          isLoading: true,
          offers: [],
          favorites: [],
          favoritesCount: 0,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render NotFoundScreen when user navigates to a non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          offers: [],
          favorites: [],
          isLoading: false,
          favoritesCount: 0,
        },
        APP: {
          city: 'Paris',
          sortOption: SortOptions.Popular,
          error: null,
        },
      })
    );

    mockHistory.push('/non-existent-route');

    render(withStoreComponent);

    // Test if 404 page content is displayed
    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByText(/Oops! Looks like you're lost in the city./)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pin/i })).toBeInTheDocument();
    expect(screen.getByText(/Go to homepage/)).toBeInTheDocument();
  });
});
