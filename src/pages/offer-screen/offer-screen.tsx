import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form.tsx';
import HeaderNav from '../../components/header-nav/header-nav.tsx';
import ReviewList from '../../components/review-list/review-list.tsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import Map from '../../components/map/map.tsx';
import styles from './offer-screen.module.css';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavouriteStatusAction, fetchOfferDataAction} from '../../store/api-actions.ts';
import {useEffect} from 'react';
import LoadingScreen from '../loading-screen/loading-screen.tsx';
import {updateOffers} from '../../store/action.ts';
import {AppRoute, AuthorizationStatus, FavouriteStatus} from '../../const.ts';

function OfferScreen(): JSX.Element{
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const offers = useAppSelector((state) => state.offers);
  const { offerDetail, nearbyOffers, reviews } = useAppSelector((state) => state.currentOffer);
  const isOfferDetailsLoading = useAppSelector((state) => state.isOfferDetailsLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferDataAction({ id }));
    }
  }, [id, dispatch]);

  const currentOffer = offers.find((offer) => offer.id === id);
  if (isOfferDetailsLoading) {
    return <LoadingScreen />;
  }

  if (!currentOffer || !offerDetail) {
    return <NotFoundScreen />;
  }

  const handleBookmarkClick = () => {
    const performAsyncAction = async () => {
      if (!id) {
        navigate(AppRoute.Main);
        return;
      }
      if (authorizationStatus !== AuthorizationStatus.Auth && authorizationStatus !== undefined) {
        navigate(AppRoute.Login);
      } else {
        const newStatus = currentOffer.isFavorite ? FavouriteStatus.Remove : FavouriteStatus.Add;
        const updatedOffer = { ...currentOffer, isFavorite: !currentOffer.isFavorite };

        dispatch(updateOffers(updatedOffer));
        await dispatch(changeFavouriteStatusAction({ offerId: id, status: newStatus }));
      }
    };

    performAsyncAction();
  };

  return (
    <div className="page">
      <Helmet>
        <title>Offer №{currentOffer.id}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerDetail.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo of ${offerDetail.title}`}
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
                <h1 className="offer__name">{offerDetail.title}</h1>
                <button
                  className={`offer__bookmark-button ${currentOffer.isFavorite && 'offer__bookmark-button--active'} button`}
                  type="button"
                  onClick={handleBookmarkClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offerDetail.rating / 5) * 100}%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerDetail.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offerDetail.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerDetail.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerDetail.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offerDetail.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className={styles.insideList}>
                  {offerDetail.goods.map((good) => (
                    <li key={good} className={styles.insideItem}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offerDetail.host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={offerDetail.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offerDetail.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  {reviews.length > 0 ? `Reviews · ${reviews.length}` : 'No reviews yet'}
                </h2>
                <ReviewList reviews={reviews}/>
                <ReviewForm offerId={id ?? ''}/>
              </section>
            </div>
          </div>
          <div className={styles.offer__map}>
            <Map
              offers={[currentOffer, ...nearbyOffers.slice(0, 3)]}
              activeOffer={currentOffer}
              className="offer__map map"
            />
          </div>
        </section>
        <div className="container">
          <NearbyOffersList
            offers={nearbyOffers.slice(0, 3)}
          />
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
