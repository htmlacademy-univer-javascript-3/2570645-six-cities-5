import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';

export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getFavorites = (state: State): Offer[] => state[NameSpace.Offers].favorites;
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isLoading;
export const getFavoritesCount = (state: State): number => state[NameSpace.Offers].favoritesCount;
