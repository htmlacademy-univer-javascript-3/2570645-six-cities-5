import {Offer} from '../../types/offer.ts';
import OfferList from '../offer-list/offer-list.tsx';

type NearbyOffersListProps = {
  offers: Offer[];
};

function NearbyOffersList({offers}: NearbyOffersListProps): JSX.Element{
  return (
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      <OfferList offers={offers} />
    </section>
  );
}

export default NearbyOffersList;
