import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { OfferDetail } from '../types/offer-detail';
import {AppRoute, SortOptions} from '../const';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('city/change');
export const setSortOption = createAction<SortOptions>('offers/setSortOption');
export const loadOffers = createAction<Offer[]>('offers/load');
export const setOffersLoadingStatus = createAction<boolean>('offers/setLoadingStatus');
export const loadOfferDetails = createAction<{ offerInfo: OfferDetail; nearestOffers: Offer[]; reviews: Review[] }>('offer/loadDetails');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('auth/setStatus');
export const saveEmail = createAction<string>('user/saveEmail');
export const setError = createAction<string | null>('error/set');
export const redirectToRoute = createAction<AppRoute>('route/redirect');
export const sendReview = createAction<Review>('review/send');
export const loadFavorites = createAction<Offer[]>('offers/loadFavorites');
export const updateOffers = createAction<Offer>('offers/updateOffers');

