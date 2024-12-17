import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuth, fetchOffers} from './store/api-actions.ts';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HistoryRouter from './components/history-router/history-router.tsx';
import browserHistory from './browser-history.ts';

store.dispatch(fetchOffers());
store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
