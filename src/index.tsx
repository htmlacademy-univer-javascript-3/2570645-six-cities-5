import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {OFFERS_MOCK} from './mocks/OFFERS_MOCK.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={OFFERS_MOCK}/>
  </React.StrictMode>
);
