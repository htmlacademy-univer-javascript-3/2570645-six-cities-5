import { Offer } from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';
import {useState} from 'react';
type OffersListProps = {
  offers: Offer[];
}

function OfferList({offers} : OffersListProps): JSX.Element{
  const [, setActiveOfferId] = useState<string | null>(null);
  const handleMouseEnter = (id: string): void => {
    setActiveOfferId(id);
  };

  const handleMouseLeave = (): void => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OfferList;
