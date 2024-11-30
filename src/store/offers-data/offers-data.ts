import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state.ts';
import { Offer } from '../../types/offer';

const initialState: OffersData = {
  offers: [],
  favorites: [],
  isLoading: false,
  favoritesCount: 0,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setOffersLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateOffers: (state, action: PayloadAction<Offer>) => {
      state.offers = state.offers.map((offer) =>
        offer.id === action.payload.id ? action.payload : offer
      );
    },
    setFavoritesCount: (state, action: PayloadAction<number>) => {
      state.favoritesCount = action.payload;
    },
    loadFavorites: (state, action: PayloadAction<Offer[]>) => {
      state.favorites = action.payload;
    },
  },
});

export const { loadOffers, setOffersLoadingStatus, updateOffers, setFavoritesCount, loadFavorites } = offersData.actions;
