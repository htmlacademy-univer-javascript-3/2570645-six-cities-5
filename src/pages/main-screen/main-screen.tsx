import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo.tsx';
import {Offer} from '../../types/offer.ts';
import OfferList from '../../components/offer-list/offer-list.tsx';
import HeaderNav from '../../components/header-nav/header-nav.tsx';
import Map from '../../components/map/map.tsx';
import {useEffect, useState} from 'react';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import {Cities, SortOptions} from '../../const.ts';
import { useAppSelector, useAppDispatch} from '../../hooks';
import MainEmpty from './main-empty.tsx';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import { getOffers } from '../../store/offers-data/selectors';
import { getCity, getSortOption } from '../../store/app-data/selectors';
import { setSortOption } from '../../store/app-data/app-data';

function MainScreen(): JSX.Element{
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const sortOption = useAppSelector(getSortOption);
  const dispatch = useAppDispatch();

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [currentCityOffers, setCurrentCityOffers] = useState<Offer[]>([]);


  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    switch (sortOption) {
      case SortOptions.PriceLowToHigh:
        filteredOffers.sort((a, b) => a.price - b.price);
        break;
      case SortOptions.PriceHighToLow:
        filteredOffers.sort((a, b) => b.price - a.price);
        break;
      case SortOptions.TopRated:
        filteredOffers.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setCurrentCityOffers(filteredOffers); // Исправлено
  }, [city, offers, sortOption]);


  const handleOfferHover = (offer: Offer | null): void => {
    setActiveOfferId(offer ? offer.id : null);
  };

  const handleSortChange = (option: SortOptions) => {
    dispatch(setSortOption(option));
  };

  const activeOffer = currentCityOffers.find((offer) => offer.id === activeOfferId) || null;

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav/>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${currentCityOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities}/>
          </section>
        </div>
        <div className="cities">
          {currentCityOffers.length > 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${currentCityOffers.length} places to stay in ${city}`}</b>
                <SortingOptions
                  onSortChange={handleSortChange}
                />
                <OfferList
                  offers={currentCityOffers}
                  onOfferHover={handleOfferHover}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  offers={currentCityOffers}
                  activeOffer={activeOffer}
                  className="cities__map map"
                />
              </div>
            </div>
          ) :
            <MainEmpty city={city}/>}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
