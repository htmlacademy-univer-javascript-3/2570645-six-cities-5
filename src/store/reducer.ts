import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity, loadOfferDetails,
  loadOffers, saveEmail,
  sendReview,
  setAuthorizationStatus, setError,
  setOffersLoadingStatus,
  setSortOption, updateOffers
} from './action';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {OfferDetail} from '../types/offer-detail.ts';
import {AuthorizationStatus, SortOptions} from '../const.ts';


type InitialStateType = {
  city: string;
  offers: Offer[];
  sortOption: SortOptions;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
  currentOffer: {
    offerDetail: OfferDetail | null;
    nearbyOffers: Offer[];
    reviews: Review[];
  };
  userEmail: string | null;
};

const initialState: InitialStateType = {
  city: 'Paris',
  offers: [],
  sortOption: SortOptions.Popular,
  authorizationStatus: AuthorizationStatus.NoAuth,
  isOffersDataLoading: false,
  error: null,
  currentOffer: {
    offerDetail: null,
    nearbyOffers: [],
    reviews: []
  },
  userEmail: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setSortOption, (state, { payload }) => {
      state.sortOption = payload;
    })
    .addCase(loadOffers, (state, { payload }) => {
      state.offers = payload;
    })
    .addCase(setOffersLoadingStatus, (state, { payload }) => {
      state.isOffersDataLoading = payload;
    })
    .addCase(setAuthorizationStatus, (state, { payload }) => {
      state.authorizationStatus = payload;
    })
    .addCase(setError, (state, { payload }) => {
      state.error = payload;
    })
    .addCase(saveEmail, (state, { payload }) => {
      state.userEmail = payload;
    })
    .addCase(loadOfferDetails, (state, { payload }) => {
      state.currentOffer = {
        offerDetail: payload.offerInfo,
        nearbyOffers: payload.nearestOffers,
        reviews: payload.reviews
      };
    })
    .addCase(sendReview, (state, { payload }) => {
      state.currentOffer.reviews.push(payload);
    })
    .addCase(updateOffers, (state, { payload }) => {
      // Обновляем предложение в массиве offers
      state.offers = state.offers.map((offer) =>
        offer.id === payload.id ? payload : offer
      );
    });;
});
