import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import MemoizedHeaderNav from './header-nav';
import { AuthorizationStatus, AppRoute } from '../../const';
import { State } from '../../types/state';
import { logout } from '../../store/api-actions';

const middlewares = [thunk];
const mockStore = configureMockStore<State>(middlewares);

describe('Component: HeaderNav', () => {
  const initialStateUnauth = {
    USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: null,
      avatarUrl: null,
    },
    OFFERS: {
      favoritesCount: 0,
    },
  };

  const initialStateAuth = {
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      email: 'test@example.com',
      avatarUrl: '/path/to/avatar.jpg',
    },
    OFFERS: {
      favoritesCount: 5,
    },
  };

  it('renders login link for unauthorized user', () => {
    const store = mockStore(initialStateUnauth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedHeaderNav />
        </MemoryRouter>
      </Provider>
    );

    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', AppRoute.Login);
  });

  it('renders user email, avatar, and favorites count for authorized user', () => {
    const store = mockStore(initialStateAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedHeaderNav />
        </MemoryRouter>
      </Provider>
    );

    const userEmail = screen.getByText('test@example.com');
    expect(userEmail).toBeInTheDocument();

    const favoritesCount = screen.getByText('5');
    expect(favoritesCount).toBeInTheDocument();

    const userAvatar = screen.getByAltText('avatar');
    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute('src', '/path/to/avatar.jpg');

    const signOutLink = screen.getByText('Sign out');
    expect(signOutLink).toBeInTheDocument();
  });

  it('dispatches logout action when sign out is clicked', async () => {
    const store = mockStore(initialStateAuth);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedHeaderNav />
        </MemoryRouter>
      </Provider>
    );

    const signOutLink = screen.getByText('Sign out');
    await user.click(signOutLink);

    const actions = store.getActions();
    expect(actions[0].type).toBe(logout.pending.type);
  });

  it('links to favorites page when favorites count is clicked', () => {
    const store = mockStore(initialStateAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedHeaderNav />
        </MemoryRouter>
      </Provider>
    );

    const favoritesLink = screen.getByText('test@example.com').closest('a');
    expect(favoritesLink).toHaveAttribute('href', AppRoute.Favorites);
  });
});
