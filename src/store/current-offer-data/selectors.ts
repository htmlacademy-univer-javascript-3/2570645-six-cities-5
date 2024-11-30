import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OfferDetail } from '../../types/offer-detail';
import { Review } from '../../types/review';
import {Offer} from '../../types/offer.ts';

export const getOfferDetail = (state: State): OfferDetail | null => state[NameSpace.CurrentOffer].offerDetail;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.CurrentOffer].nearbyOffers;
export const getReviews = (state: State): Review[] => state[NameSpace.CurrentOffer].reviews;
export const getOfferDetailsLoadingStatus = (state: State): boolean => state[NameSpace.CurrentOffer].isLoading;
