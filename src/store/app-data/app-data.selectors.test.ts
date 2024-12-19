import { NameSpace } from '../../const';
import { SortOptions } from '../../const';
import { getCity, getSortOption } from './selectors';

describe('AppData selectors', () => {
  const state = {
    [NameSpace.App]: {
      city: 'Paris',
      sortOption: SortOptions.Popular,
      error: null,
    }
  };

  it('should return city from state', () => {
    const { city } = state[NameSpace.App];
    const result = getCity(state);
    expect(result).toBe(city);
  });

  it('should return sort option from state', () => {
    const { sortOption } = state[NameSpace.App];
    const result = getSortOption(state);
    expect(result).toBe(sortOption);
  });
});
