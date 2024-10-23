import {Offer} from '../types/offer.ts';

export const OFFERS_MOCK: Offer[] = [
  {
    id: '489e52ad-459b-43cb-b520-ee9e72fca07c',
    title: 'Amazing and Extremely Central Flat',
    type: 'apartment',
    price: 353,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.397540000000006,
      longitude: 4.9099759999999995,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 1.7
  },
  {
    id: 'bf8938c6-0726-415c-9ea7-bd7ad3ca848e',
    title: 'Perfectly located Castro',
    type: 'room',
    price: 270,
    previewImage: 'img/room.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.35754,
      longitude: 4.9179759999999995,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3
  },
  {
    id: '501beac5-5a19-486c-be33-a9d4ea390896',
    title: 'The house among olive',
    type: 'apartment',
    price: 470,
    previewImage: 'img/apartment-02.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.35054,
      longitude: 4.908976,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 2.2
  },
  {
    id: 'afb42d53-3aac-469b-9aca-f5bdb97ab3a1',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'apartment',
    price: 281,
    previewImage: 'img/apartment-03.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.37154,
      longitude: 4.889976,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 5
  },
];
