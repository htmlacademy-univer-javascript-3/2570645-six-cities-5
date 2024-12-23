import { appData, changeCity, setSortOption } from './app-data';
import { AppData } from '../../types/state';
import { SortOptions } from '../../const';

describe('AppData Slice', () => {
  const initialState: AppData = {
    city: 'Paris',
    sortOption: SortOptions.Popular,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change city with "changeCity" action', () => {
    const newCity = 'Amsterdam';
    const expectedState = { ...initialState, city: newCity };

    const result = appData.reducer(initialState, changeCity(newCity));

    expect(result).toEqual(expectedState);
  });

  it('should change sort option with "setSortOption" action', () => {
    const newSortOption = SortOptions.PriceHighToLow;
    const expectedState = { ...initialState, sortOption: newSortOption };

    const result = appData.reducer(initialState, setSortOption(newSortOption));

    expect(result).toEqual(expectedState);
  });
});
