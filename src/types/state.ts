import { store } from '../store';
import {OfferDetail} from './offer-detail.ts';
import {Review} from './review.ts';
import {Offer} from './offer.ts';
import {AuthorizationStatus, SortOptions} from '../const.ts';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CurrentOfferData = {
  offerDetail: OfferDetail | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isLoading: boolean;
};

export type OffersData = {
  offers: Offer[];
  favorites: Offer[];
  isLoading: boolean;
  favoritesCount: number;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  email: string | null;
};

export type AppData = {
  city: string;
  sortOption: SortOptions;
  error: string | null;
};
