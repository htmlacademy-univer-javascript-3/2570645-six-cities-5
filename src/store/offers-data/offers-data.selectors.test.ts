import { NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { getOffers, getFavorites, getOffersLoadingStatus, getFavoritesCount } from './selectors';

describe('OffersData selectors', () => {
  const mockOffers = [makeFakeOffer(), makeFakeOffer()];
  const mockFavorites = [makeFakeOffer()];

  const state = {
    [NameSpace.Offers]: {
      offers: mockOffers,
      favorites: mockFavorites,
      isLoading: true,
      favoritesCount: 3,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffers(state);
    expect(result).toBe(offers);
  });

  it('should return favorites from state', () => {
    const { favorites } = state[NameSpace.Offers];
    const result = getFavorites(state);
    expect(result).toBe(favorites);
  });

  it('should return offers loading status from state', () => {
    const { isLoading } = state[NameSpace.Offers];
    const result = getOffersLoadingStatus(state);
    expect(result).toBe(isLoading);
  });

  it('should return favorites count from state', () => {
    const { favoritesCount } = state[NameSpace.Offers];
    const result = getFavoritesCount(state);
    expect(result).toBe(favoritesCount);
  });
});
