import {FavouriteStatus} from '../const.ts';

export type FavouriteAction = {
  offerId: string;
  status: FavouriteStatus;
};
