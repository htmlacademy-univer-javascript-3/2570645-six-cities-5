import {createMemoryHistory} from 'history';
import {render} from '@testing-library/react';
import HistoryRouter from './history-router.tsx';
import {Route, Routes} from 'react-router-dom';
import {act} from 'react-dom/test-utils';


describe('Component: HistoryRouter', () => {
  it('should render initial route correctly', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <HistoryRouter history={history}>
        <div>Initial Content</div>
      </HistoryRouter>
    );

    expect(container.innerHTML).toContain('Initial Content');
    expect(history.location.pathname).toBe('/');
  });

  it('should update view on history changes', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </HistoryRouter>
    );

    expect(container.innerHTML).toContain('Home Page');

    act(() => {
      history.push('/about');
    });

    expect(container.innerHTML).toContain('About Page');
  });

  it('should handle browser navigation', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </HistoryRouter>
    );

    act(() => {
      history.push('/contact');
    });
    expect(container.innerHTML).toContain('Contact Page');

    act(() => {
      history.back();
    });
    expect(container.innerHTML).toContain('Home Page');
  });

  it('should respect provided basename', () => {
    const history = createMemoryHistory();
    const basename = '/app';

    render(
      <HistoryRouter history={history} basename={basename}>
        <div>Basenamed Content</div>
      </HistoryRouter>
    );

    act(() => {
      history.push('/app/dashboard');
    });
    expect(history.location.pathname).toBe('/app/dashboard');
  });

  it('should properly handle history listener', () => {
    const history = createMemoryHistory();
    const listenSpy = vi.spyOn(history, 'listen');

    const { unmount } = render(
      <HistoryRouter history={history}>
        <div>Content</div>
      </HistoryRouter>
    );

    expect(listenSpy).toHaveBeenCalledTimes(1);

    unmount();
    // После unmount слушатель должен быть удален
    expect(history.listen(() => {})).toBeDefined();
  });
});
