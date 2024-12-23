import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthorizationStatus, SortOptions } from '../../const';
import MainScreen from './main-screen';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';

describe('MainScreen Component', () => {
  it('should render "No places to stay available" when there are no offers', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<MainScreen />, mockHistory);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
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
        APP: {
          city: 'Paris',
          sortOption: SortOptions.Popular,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });

  it('should render offers when there are offers available', () => {
    const mockHistory = createMemoryHistory();
    const offer1 = makeFakeOffer();
    const offer2 = makeFakeOffer();
    const withHistoryComponent = withHistory(<MainScreen />, mockHistory);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          email: 'test@example.com',
          avatarUrl: 'https://example.com/avatar.jpg',
        },
        OFFERS: {
          offers: [offer1, offer2],
          favorites: [],
          isLoading: false,
          favoritesCount: 0,
        },
        APP: {
          city: offer1.city.name,
          sortOption: SortOptions.Popular,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(new RegExp(`places to stay in ${offer1.city.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(offer1.title)).toBeInTheDocument();
  });
});
