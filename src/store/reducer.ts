import { createReducer } from '@reduxjs/toolkit';
import {setOffersList, changeCity, setReviews, setOffersInDetails, setSortOption} from './action';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { OfferDetails } from '../types/offer-details.ts';
import { OFFERS_MOCK } from '../mocks/OFFERS_MOCK.ts';
import { REVIEWS_MOCK } from '../mocks/REVIEWS_MOCK.ts';
import { OFFERS_DETAILS } from '../mocks/OFFERS_DETAILS.ts';
import { SortOptions } from '../const.ts';


type InitialStateType = {
  city: string;
  offersList: Offer[];
  reviews: Review[];
  offersInDetails: OfferDetails[];
  sortOption: SortOptions;
};

const initialState: InitialStateType = {
  city: 'Paris',
  offersList: [],
  reviews: [],
  offersInDetails: [],
  sortOption: SortOptions.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offersList = OFFERS_MOCK;
    })
    .addCase(setReviews, (state) => {
      state.reviews = REVIEWS_MOCK;
    })
    .addCase(setOffersInDetails, (state) => {
      state.offersInDetails = OFFERS_DETAILS;
    })
    .addCase(setSortOption, (state, { payload }) => {
      state.sortOption = payload;
    });
});
