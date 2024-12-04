import {useRef, useEffect, useMemo, memo} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './useMap';
import {Offer} from '../../types/offer';

type MapProps = {
  offers: Offer[];
  activeOffer: Offer | null;
  className: string;
};

function Map({offers, activeOffer, className}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, offers[0].city.location);

  const defaultCustomIcon = useMemo(() =>
    leaflet.icon({
      iconUrl: '/img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    }),
  []);

  const currentCustomIcon = useMemo(() =>
    leaflet.icon({
      iconUrl: '/img/pin-active.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    }),
  []);

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
      className={className}
      ref={mapRef}
    >
    </div>
  );
}

const MemoizedMap = memo(Map, (prevProps, nextProps) =>
  prevProps.activeOffer?.id === nextProps.activeOffer?.id &&
  prevProps.offers.map((offer) => offer.id).join() === nextProps.offers.map((offer) => offer.id).join()
);

export default MemoizedMap;
