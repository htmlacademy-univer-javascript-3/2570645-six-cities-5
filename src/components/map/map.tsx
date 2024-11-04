import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './useMap';
import {Offer} from '../../types/offer';

type MapProps = {
  offers: Offer[];
  activeOffer: Offer | null;
};

function Map({offers, activeOffer}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, offers[0].city.location);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: 'public/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: 'public/img/pin-active.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  useEffect(() => {
    if (map) {
      const markers = leaflet.layerGroup();

      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: activeOffer?.id === offer.id
                ? currentCustomIcon
                : defaultCustomIcon,
            })
          .addTo(markers);
      });

      markers.addTo(map);

      return () => {
        markers.clearLayers();
      };
    }
  },[map, offers, activeOffer, currentCustomIcon, defaultCustomIcon]);

  return (
    <div
      className="cities__map map"
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
