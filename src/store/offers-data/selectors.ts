import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';

export const getOffers = (state: Pick<State, NameSpace.Offers>): Offer[] => state[NameSpace.Offers].offers;
export const getFavorites = (state: Pick<State, NameSpace.Offers>): Offer[] => state[NameSpace.Offers].favorites;
export const getOffersLoadingStatus = (state: Pick<State, NameSpace.Offers>): boolean => state[NameSpace.Offers].isLoading;
export const getFavoritesCount = (state: Pick<State, NameSpace.Offers>): number => state[NameSpace.Offers].favoritesCount;
