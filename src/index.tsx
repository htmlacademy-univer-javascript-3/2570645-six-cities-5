import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {OFFERS_MOCK} from './mocks/OFFERS_MOCK.ts';
import {REVIEWS_MOCK} from './mocks/REVIEWS_MOCK.ts';
import {OFFERS_DETAILS} from './mocks/OFFERS_DETAILS.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={OFFERS_MOCK}
      reviews={REVIEWS_MOCK}
      offerDetails={OFFERS_DETAILS}
    />
  </React.StrictMode>
);
