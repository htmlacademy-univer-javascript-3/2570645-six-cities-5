import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffer, makeFakeOfferDetail, makeFakeReview } from '../utils/mocks';
import { State } from '../types/state';
import {
  fetchOffers,
  fetchOfferDataAction,
  sendCommentAction,
  fetchFavoritesAction,
  checkAuth,
  login,
  logout,
  changeFavouriteStatusAction
} from './api-actions';
import { APIRoute, AuthorizationStatus, FavouriteStatus } from '../const';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFERS: { offers: [], favorites: [], isLoading: false, favoritesCount: 0 },
      CURRENT_OFFER: { offerDetail: null, nearbyOffers: [], reviews: [], isLoading: false },
      USER: { authorizationStatus: AuthorizationStatus.Unknown, email: null, avatarUrl: null }
    });
  });

  describe('fetchOffers', () => {
    it('should dispatch fetchOffers with successful response', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffers());
      const actions = store.getActions();
      const actionTypes = actions.map((action) => action.type);
      expect(actionTypes).toContain(fetchOffers.pending.type);
      expect(actionTypes).toContain(fetchOffers.fulfilled.type);

      const fulfilledAction = actions.find((action) => action.type === fetchOffers.fulfilled.type);
      expect(fulfilledAction).toBeDefined();
    });
  });

  describe('fetchOfferDataAction', () => {
    it('should fetch offer details, nearby offers, and reviews', async () => {
      const mockOfferId = 'test-offer-id';
      const mockOfferDetail = makeFakeOfferDetail();
      const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];
      const mockReviews = [makeFakeReview(), makeFakeReview()];

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferId}`).reply(200, mockOfferDetail);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferId}/nearby`).reply(200, mockNearbyOffers);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOfferId}`).reply(200, mockReviews);

      await store.dispatch(fetchOfferDataAction({ id: mockOfferId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain('fetchOfferData/fulfilled');
    });
  });

  describe('sendCommentAction', () => {
    it('should send a comment and dispatch sendReview', async () => {
      const mockOfferId = 'test-offer-id';
      const mockComment = {
        comment: 'Test comment',
        rating: 4
      };
      const mockReview = makeFakeReview();

      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockOfferId}`).reply(200, mockReview);

      await store.dispatch(sendCommentAction({ comment: mockComment, id: mockOfferId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain('sendComment/fulfilled');
    });
  });

  describe('login', () => {
    it('should successfully login and save token', async () => {
      const mockAuthData = { email: 'test@example.com', password: 'password' };
      const mockUserData = {
        token: 'test-token',
        email: 'test@example.com',
        avatarUrl: 'http://test.com/avatar.jpg'
      };

      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUserData);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(login(mockAuthData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain('user/login/fulfilled');
      expect(mockSaveToken).toHaveBeenCalledWith(mockUserData.token);
    });
  });

  describe('logout', () => {
    it('should successfully logout', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain('user/logout/fulfilled');
      expect(mockDropToken).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should fetch favorites successfully', async () => {
      const mockFavorites = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(fetchFavoritesAction.fulfilled.type);
    });

    it('should handle error when fetching favorites', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(fetchFavoritesAction.rejected.type);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should fetch favorites successfully', async () => {
      const mockFavorites = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(fetchFavoritesAction.fulfilled.type);
    });

    it('should handle error when fetching favorites', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(fetchFavoritesAction.rejected.type);
    });
  });

  describe('checkAuth', () => {
    it('should check auth successfully when token exists', async () => {
      const mockUserData = {
        email: 'test@example.com',
        avatarUrl: 'http://test.com/avatar.jpg'
      };

      vi.spyOn(tokenStorage, 'getToken').mockReturnValue('test-token');
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(checkAuth.fulfilled.type);
    });
  });

  describe('changeFavouriteStatusAction', () => {
    it('should handle error when changing favorite status', async () => {
      const mockFavouriteAction = {
        offerId: 'test-offer-id',
        status: FavouriteStatus.Add
      };

      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/test-offer-id/${FavouriteStatus.Add}`)
        .reply(400);

      await store.dispatch(changeFavouriteStatusAction(mockFavouriteAction));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(changeFavouriteStatusAction.rejected.type);
    });
  });
});
