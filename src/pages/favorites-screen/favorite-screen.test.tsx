import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthorizationStatus } from '../../const';
import FavoritesScreen from './favorites-screen';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';

describe('FavoritesScreen Component', () => {
  it('should render "Nothing yet saved" when there are no favorite offers', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<FavoritesScreen />, mockHistory);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          email: 'test@example.com',
          avatarUrl: 'https://example.com/avatar.jpg',
        },
        OFFERS: {
          favorites: [],
          offers: [],
          isLoading: false,
          favoritesCount: 0,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search results/i)).toBeInTheDocument();
  });

  it('should render favorite offers when there are favorite offers', () => {
    const mockHistory = createMemoryHistory();
    const favoriteOffer = makeFakeOffer();
    const withHistoryComponent = withHistory(<FavoritesScreen />, mockHistory);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          email: 'test@example.com',
          avatarUrl: 'https://example.com/avatar.jpg',
        },
        OFFERS: {
          favorites: [favoriteOffer],
          offers: [],
          isLoading: false,
          favoritesCount: 1,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(favoriteOffer.title)).toBeInTheDocument();
  });
});
