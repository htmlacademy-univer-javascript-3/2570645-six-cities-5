import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from './private-route.tsx';

describe('Component: PrivateRoute', () => {
  it('should render children if authorizationStatus is Auth', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <div>Private Content</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('should redirect to login page if authorizationStatus is not Auth', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <div>Private Content</div>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
  });
});
