import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import {loadOfferDetails, sendReview, setOfferDetailsLoadingStatus} from './current-offer-data/current-offer-data';
import { store } from './index';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const.ts';
import { dropToken, getToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { Review } from '../types/review';
import { CommentFormData } from '../types/comment-form-data.ts';
import { OfferDetail } from '../types/offer-detail.ts';
import { FavouriteAction } from '../types/favourite-action.ts';
import {
  loadFavorites,
  loadOffers,
  setFavoritesCount,
  setOffersLoadingStatus,
  updateOffers
} from './offers-data/offers-data.ts';
import {saveAvatarUrl, saveEmail, setAuthorizationStatus} from './user-process/user-process.ts';
import {setError} from './app-data/app-data.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    try {
      const response = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(response.data));
    } finally {
      dispatch(setOffersLoadingStatus(false));
    }
  }
);

export const fetchOfferDataAction = createAsyncThunk<
  void,
  {
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('fetchOfferData', async ({ id }, { dispatch, extra: api }) => {
  dispatch(setOfferDetailsLoadingStatus(true));
  try {
    const [offerInfo, nearestOffers, reviews] = await Promise.all([
      api.get<OfferDetail>(`${APIRoute.Offers}/${id}`),
      api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`),
      api.get<Review[]>(`${APIRoute.Comments}/${id}`)
    ]);

    dispatch(loadOfferDetails({
      offerInfo: offerInfo.data,
      nearestOffers: nearestOffers.data,
      reviews: reviews.data
    }));
  } finally {
    dispatch(setOfferDetailsLoadingStatus(false));
  }
});

export const sendCommentAction = createAsyncThunk<
  void,
  { comment: CommentFormData; id: string },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('sendComment', async ({ comment, id }, { dispatch, extra: api }) => {
  const { data: review } = await api.post<Review>(`${APIRoute.Comments}/${id}`,
    {
      comment: comment.comment,
      rating: comment.rating,
    });
  dispatch(sendReview(review));
});

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Favorite}`);
    dispatch(loadFavorites(data));
    dispatch(setFavoritesCount(data.length));
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_, { dispatch, extra: api }) => {
    const token = getToken();
    if (token) {
      try {
        const { data } = await api.get<UserData>(APIRoute.Login);
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(saveEmail(data.email));
        dispatch(saveAvatarUrl(data.avatarUrl));
        dispatch(fetchFavoritesAction());
      } catch {
        dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      }
    } else {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const login = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email: email, password }, { dispatch, extra: api }) => {
    const response = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(response.data.token);
    dispatch(saveEmail(email));
    dispatch(saveAvatarUrl(response.data.avatarUrl));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(fetchFavoritesAction());
  }
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(saveEmail(null));
    dispatch(saveAvatarUrl(null));
    dispatch(loadFavorites([]));
  }
);

export const clearError = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
  }
);


export const changeFavouriteStatusAction = createAsyncThunk<void, FavouriteAction, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/changeFavoriteStatus',
  async ({status, offerId}, {extra: api, dispatch}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    dispatch(updateOffers(data));
    dispatch(fetchFavoritesAction());
  },
);
