import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo.tsx';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form.tsx';
import HeaderNav from '../../components/header-nav/header-nav.tsx';
import {Offer} from '../../types/offer.ts';
import ReviewList from '../../components/review-list/review-list.tsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import Map from '../../components/map/map.tsx';
import styles from './offer-screen.module.css';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list.tsx';
import {Review} from '../../types/review.ts';
import {OfferDetails} from '../../types/offer-details.ts';

type OfferScreenProps = {
  offers: Offer[];
  reviews: Review[];
  offerDetails: OfferDetails[];
};

function OfferScreen({offers, reviews, offerDetails} : OfferScreenProps): JSX.Element{
  const params = useParams();
  const currentOffer = offers.find((offer) => offer.id === params.id);
  const detailOffer = offerDetails.find((offer) => offer.id === params.id);

  if (!currentOffer || !detailOffer){
    return <NotFoundScreen />;
  }

  // Временная реализации
  const nearbyOffers = offers
    .filter((offer) => offer.id !== currentOffer.id)
    .slice(0, 3);

  return (
    <div className="page">
      <Helmet>
        <title>Offer №{currentOffer.id}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav offers={offers}/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {detailOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo of ${detailOffer.title}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{detailOffer.title}</h1>
                <button className={`offer__bookmark-button ${currentOffer.isFavorite && 'offer__bookmark-button--active'} button`} type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(detailOffer.rating / 5) * 100}%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{detailOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{detailOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {detailOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {detailOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{detailOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className={styles.insideList}>
                  {detailOffer.goods.map((good) => (
                    <li key={good} className={styles.insideItem}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${detailOffer.host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={detailOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{detailOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  {reviews.length > 0 ? `Reviews · ${reviews.length}` : 'No reviews yet'}
                </h2>
                <ReviewList reviews={reviews}/>
                <ReviewForm/>
              </section>
            </div>
          </div>
          <div className={styles.offer__map}>
            <Map
              offers={[currentOffer, ...nearbyOffers]}
              activeOffer={currentOffer}
              className="offer__map map"
            />
          </div>
        </section>
        <div className="container">
          <NearbyOffersList
            offers={nearbyOffers}
          />
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
