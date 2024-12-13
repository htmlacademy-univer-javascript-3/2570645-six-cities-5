import { offersData, loadOffers, setOffersLoadingStatus, updateOffers, setFavoritesCount, loadFavorites } from './offers-data';
import { OffersData } from '../../types/state';
import { makeFakeOffer } from '../../utils/mocks';

describe('OffersData Slice', () => {
  const initialState: OffersData = {
    offers: [],
    favorites: [],
    isLoading: false,
    favoritesCount: 0,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offersData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should load offers with "loadOffers" action', () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const expectedState = { ...initialState, offers: mockOffers };

    const result = offersData.reducer(initialState, loadOffers(mockOffers));

    expect(result).toEqual(expectedState);
  });

  it('should set offers loading status with "setOffersLoadingStatus" action', () => {
    const expectedState = { ...initialState, isLoading: true };

    const result = offersData.reducer(initialState, setOffersLoadingStatus(true));

    expect(result).toEqual(expectedState);
  });

  it('should update specific offer with "updateOffers" action', () => {
    const initialOffers = [makeFakeOffer(), makeFakeOffer()];
    const initialStateWithOffers = { ...initialState, offers: initialOffers };
    const updatedOffer = { ...initialOffers[1], title: 'Updated Offer' };
    const expectedState = {
      ...initialStateWithOffers,
      offers: [initialOffers[0], updatedOffer],
    };

    const result = offersData.reducer(initialStateWithOffers, updateOffers(updatedOffer));

    expect(result).toEqual(expectedState);
  });

  it('should set favorites count with "setFavoritesCount" action', () => {
    const expectedState = { ...initialState, favoritesCount: 5 };

    const result = offersData.reducer(initialState, setFavoritesCount(5));

    expect(result).toEqual(expectedState);
  });

  it('should load favorites with "loadFavorites" action', () => {
    const mockFavorites = [makeFakeOffer(), makeFakeOffer()];
    const expectedState = { ...initialState, favorites: mockFavorites };

    const result = offersData.reducer(initialState, loadFavorites(mockFavorites));

    expect(result).toEqual(expectedState);
  });
});
