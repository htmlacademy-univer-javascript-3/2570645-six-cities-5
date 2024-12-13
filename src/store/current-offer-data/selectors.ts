import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OfferDetail } from '../../types/offer-detail';
import { Review } from '../../types/review';
import {Offer} from '../../types/offer.ts';

export const getOfferDetail = (state: Pick<State, NameSpace.CurrentOffer>): OfferDetail | null => state[NameSpace.CurrentOffer].offerDetail;
export const getNearbyOffers = (state: Pick<State, NameSpace.CurrentOffer>): Offer[] => state[NameSpace.CurrentOffer].nearbyOffers;
export const getReviews = (state: Pick<State, NameSpace.CurrentOffer>): Review[] => state[NameSpace.CurrentOffer].reviews;
export const getOfferDetailsLoadingStatus = (state: Pick<State, NameSpace.CurrentOffer>): boolean => state[NameSpace.CurrentOffer].isLoading;
