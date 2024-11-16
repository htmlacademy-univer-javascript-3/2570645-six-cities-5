import {Offer} from '../types/offer.ts';

export const OFFERS_MOCK: Offer[] = [
  {
    id: '489e52ad-459b-43cb-b520-ee9e72fca07c',
    title: 'Perfectly located Castro',
    type: 'apartment',
    price: 496,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.6
  },
  {
    id: 'bf8938c6-0726-415c-9ea7-bd7ad3ca848e',
    title: 'The Joshua Tree House',
    type: 'room',
    price: 216,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 3
  },
  {
    id: '501beac5-5a19-486c-be33-a9d4ea390896',
    title: 'Tile House',
    type: 'apartment',
    price: 266,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.7
  },
  {
    id: 'afb42d53-3aac-469b-9aca-f5bdb97ab3a1',
    title: 'The house among olive',
    type: 'apartment',
    price: 302,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 5
  },
  {
    id: 'f0d0f0b0-3a54-4ab5-9690-16c62136628f',
    title: 'The Joshua Tree House',
    type: 'house',
    price: 958,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5
  },
  {
    id: 'a9624eea-8bb8-4125-8dde-95b84d677e31',
    title: 'Perfectly located Castro',
    type: 'room',
    price: 274,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.4
  },
  {
    id: '4a98ee8f-cbb0-49a6-bb59-66e7cfdee189',
    title: 'Waterfront with extraordinary view',
    type: 'house',
    price: 795,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/1.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.1
  },
];
