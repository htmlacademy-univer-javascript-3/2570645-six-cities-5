import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MemoizedCitiesList from './cities-list';
import { State } from '../../types/state';
import {Cities} from '../../const.ts';


const mockStore = configureMockStore<State>();

describe('Component: CitiesList', () => {
  const initialState = {
    APP: {
      city: 'Paris',
    },
  };

  const store = mockStore(initialState);

  it('should render all cities correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedCitiesList cities={Cities} />
        </MemoryRouter>
      </Provider>
    );

    Cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should have active state for the currently selected city', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedCitiesList cities={Cities} />
        </MemoryRouter>
      </Provider>
    );

    const parisLink = screen.getByText('Paris');
    expect(parisLink.closest('a')).toHaveClass('tabs__item--active');
  });

  it('should dispatch city change on city click', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedCitiesList cities={Cities} />
        </MemoryRouter>
      </Provider>
    );

    const cologneLink = screen.getByText('Cologne');
    await user.click(cologneLink);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('APP/changeCity');
    expect(actions[0].payload).toBe('Cologne');
  });

  it('should have correct number of city items', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedCitiesList cities={Cities} />
        </MemoryRouter>
      </Provider>
    );

    const cityItems = screen.getAllByRole('listitem');
    expect(cityItems).toHaveLength(Cities.length);
  });
});
