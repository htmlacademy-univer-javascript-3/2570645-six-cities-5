import { name, internet } from 'faker';
import { Offer } from '../types/offer';
import { OfferDetail } from '../types/offer-detail';
import { Review } from '../types/review';
import { User } from '../types/user';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {State} from '../types/state.ts';
import {createAPI} from '../services/api.ts';
import {Action} from 'redux';


export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export function makeFakeOffer(): Offer {
  return {
    id: name.title(),
    title: name.title(),
    type: 'apartment',
    price: Math.floor(Math.random() * 1000),
    city: {
      name: name.title(),
      location: {
        latitude: Math.random() * 90,
        longitude: Math.random() * 180,
        zoom: 10
      }
    },
    location: {
      latitude: Math.random() * 90,
      longitude: Math.random() * 180,
      zoom: 10
    },
    isFavorite: Math.random() > 0.5,
    isPremium: Math.random() > 0.5,
    rating: Math.random() * 5,
    previewImage: internet.url()
  };
}

export function makeFakeUser(): User {
  return {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: Math.random() > 0.5
  };
}

export function makeFakeOfferDetail(): OfferDetail {
  return {
    ...makeFakeOffer(),
    description: name.title(),
    bedrooms: Math.floor(Math.random() * 5),
    goods: ['WiFi', 'Heating', 'Kitchen'],
    host: makeFakeUser(),
    images: [internet.url(), internet.url()],
    maxAdults: Math.floor(Math.random() * 6)
  };
}

export function makeFakeReview(): Review {
  return {
    id: name.title(),
    date: new Date().toISOString(),
    user: makeFakeUser(),
    comment: name.title(),
    rating: Math.floor(Math.random() * 5)
  };
}
