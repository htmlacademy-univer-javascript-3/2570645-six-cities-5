import { NameSpace } from '../../const';
import { makeFakeOfferDetail, makeFakeOffer, makeFakeReview } from '../../utils/mocks';
import { getOfferDetail, getNearbyOffers, getReviews, getOfferDetailsLoadingStatus } from './selectors';

describe('CurrentOffer selectors', () => {
  const mockOfferDetail = makeFakeOfferDetail();
  const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];
  const mockReviews = [makeFakeReview(), makeFakeReview()];

  const state = {
    [NameSpace.CurrentOffer]: {
      offerDetail: mockOfferDetail,
      nearbyOffers: mockNearbyOffers,
      reviews: mockReviews,
      isLoading: true,
    }
  };

  it('should return offer detail from state', () => {
    const { offerDetail } = state[NameSpace.CurrentOffer];
    const result = getOfferDetail(state);
    expect(result).toBe(offerDetail);
  });

  it('should return nearby offers from state', () => {
    const { nearbyOffers } = state[NameSpace.CurrentOffer];
    const result = getNearbyOffers(state);
    expect(result).toBe(nearbyOffers);
  });

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.CurrentOffer];
    const result = getReviews(state);
    expect(result).toBe(reviews);
  });

  it('should return offer details loading status from state', () => {
    const { isLoading } = state[NameSpace.CurrentOffer];
    const result = getOfferDetailsLoadingStatus(state);
    expect(result).toBe(isLoading);
  });
});
