import { Offer } from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';

type OffersListProps = {
  offers: Offer[];
  onOfferHover?: (offer: Offer | null) => void;
}

function OfferList({offers, onOfferHover} : OffersListProps): JSX.Element{
  const handleMouseEnter = (offer: Offer): void => {
    onOfferHover?.(offer);
  };

  const handleMouseLeave = (): void => {
    onOfferHover?.(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OfferList;
