import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import {currentOfferData} from './current-offer-data/current-offer-data.ts';
import {offersData} from './offers-data/offers-data.ts';
import {userProcess} from './user-process/user-process.ts';
import {appData} from './app-data/app-data.ts';

export const rootReducer = combineReducers({
  [NameSpace.CurrentOffer]: currentOfferData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.App]: appData.reducer,
});
