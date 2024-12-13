import { appData, changeCity, setSortOption, setError } from './app-data';
import { AppData } from '../../types/state';
import { SortOptions } from '../../const';

describe('AppData Slice', () => {
  const initialState: AppData = {
    city: 'Paris',
    sortOption: SortOptions.Popular,
    error: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appData.reducer(undefined, emptyAction);

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

  it('should set error with "setError" action', () => {
    const errorMessage = 'Test error';
    const expectedState = { ...initialState, error: errorMessage };

    const result = appData.reducer(initialState, setError(errorMessage));

    expect(result).toEqual(expectedState);
  });

  it('should clear error with "setError" action', () => {
    const stateWithError = { ...initialState, error: 'Previous error' };
    const expectedState = { ...initialState, error: null };

    const result = appData.reducer(stateWithError, setError(null));

    expect(result).toEqual(expectedState);
  });
});
