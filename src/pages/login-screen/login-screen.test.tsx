import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthorizationStatus, SortOptions } from '../../const';
import LoginScreen from './login-screen';
import { makeFakeStore } from '../../utils/mocks';

describe('LoginScreen Component', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<LoginScreen />, mockHistory);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          email: null,
          avatarUrl: null,
        },
        APP: {
          city: 'Paris',
          sortOption: SortOptions.Popular,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });


  it('should handle form submission', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<LoginScreen />, mockHistory);

    const { withStoreComponent, mockStore } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          email: null,
          avatarUrl: null,
        },
        APP: {
          city: 'Paris',
          sortOption: SortOptions.Popular,
        },
      })
    );

    render(withStoreComponent);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    const actions = mockStore.getActions();
    expect(actions[1].type).toBe('user/login/pending');
  });
});
