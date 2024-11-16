import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { OfferDetails } from '../types/offer-details.ts';
import { SortOptions } from '../const.ts';

export const setOffersList = createAction<Offer[]>('offers/setOffersList');
export const setReviews = createAction<Review[]>('reviews/setReviews');
export const setOffersInDetails = createAction<OfferDetails[]>('offers/setOffersInDetails');
export const changeCity = createAction<string>('city/changeCity');
export const setSortOption = createAction<SortOptions>('offers/setSortOption');
