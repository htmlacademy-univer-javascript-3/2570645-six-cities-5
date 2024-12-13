import { currentOfferData, loadOfferDetails, sendReview, setOfferDetailsLoadingStatus } from './current-offer-data';
import { CurrentOfferData } from '../../types/state';
import { makeFakeOfferDetail, makeFakeOffer, makeFakeReview } from '../../utils/mocks';

describe('CurrentOfferData Slice', () => {
  const initialState: CurrentOfferData = {
    offerDetail: null,
    nearbyOffers: [],
    reviews: [],
    isLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = currentOfferData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = currentOfferData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should load offer details with "loadOfferDetails" action', () => {
    const mockOfferDetail = makeFakeOfferDetail();
    const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];
    const mockReviews = [makeFakeReview(), makeFakeReview()];

    const expectedState = {
      ...initialState,
      offerDetail: mockOfferDetail,
      nearbyOffers: mockNearbyOffers,
      reviews: mockReviews,
    };

    const result = currentOfferData.reducer(
      initialState,
      loadOfferDetails({
        offerInfo: mockOfferDetail,
        nearestOffers: mockNearbyOffers,
        reviews: mockReviews
      })
    );

    expect(result).toEqual(expectedState);
  });

  it('should send a new review with "sendReview" action', () => {
    const initialStateWithReviews = {
      ...initialState,
      reviews: [makeFakeReview()],
    };
    const newReview = makeFakeReview();
    const expectedState = {
      ...initialState,
      reviews: [...initialStateWithReviews.reviews, newReview],
    };

    const result = currentOfferData.reducer(
      initialStateWithReviews,
      sendReview(newReview)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set loading status with "setOfferDetailsLoadingStatus" action', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
    };

    const result = currentOfferData.reducer(
      initialState,
      setOfferDetailsLoadingStatus(true)
    );

    expect(result).toEqual(expectedState);
  });
});
