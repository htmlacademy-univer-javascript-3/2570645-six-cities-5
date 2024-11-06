import {Review} from '../types/review.ts';

export const REVIEWS_MOCK: Review[] = [
  {
    id: 'e60e1c94-969c-4eed-8448-437eb57127eb',
    comment: 'This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.',
    date: '2024-09-27T21:00:01.471Z',
    rating: 3,
    user: {
      name: 'Max',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/5.jpg',
      isPro: false
    }
  },
  {
    id: '1994e6c7-d649-4242-9ba9-b6d21a04ce3b',
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2024-10-12T21:00:00.802Z',
    rating: 4,
    user: {
      name: 'Sophie',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/9.jpg',
      isPro: false
    }
  },
  {
    id: '129e4721-6de5-4a98-8352-dee0b6dbdbf3',
    comment: 'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2024-10-11T21:00:01.334Z',
    rating: 5,
    user: {
      name: 'Mollie',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/9.jpg',
      isPro: false
    }
  }
];
