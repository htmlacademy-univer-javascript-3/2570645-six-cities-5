import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo.tsx';
import { Offer } from '../../types/offer.ts';
import OfferList from '../../components/offer-list/offer-list';
import { Link } from 'react-router-dom';
import HeaderNav from '../../components/header-nav/header-nav.tsx';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const.ts';
import { getFavorites } from '../../store/offers-data/selectors';

function FavoritesScreen(): JSX.Element{
  const favoriteOffers = useAppSelector(getFavorites);

  const groupedOffers = favoriteOffers.reduce<{ [key: string]: Offer[] }>((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {});

  return (
    <div className="page">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                    Save properties to narrow down search results.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedOffers).map(([city, cityOffers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="#">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferList offers={cityOffers}/>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="public/img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
