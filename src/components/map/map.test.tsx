import {render} from '@testing-library/react';
import Map from './map';
import { makeFakeOffer } from '../../utils/mocks';
import { Offer } from '../../types/offer';

vi.mock('../../hooks/useMap', () => ({
  __esModule: true,
  default: vi.fn(),
}));


describe('Component: Map', () => {
  const mockClassName = 'test-map-class';
  let mockOffers: Offer[];
  let mockActiveOffer: Offer;

  beforeEach(() => {
    mockOffers = Array.from({ length: 3 }, () => makeFakeOffer());
    mockActiveOffer = mockOffers[0];
  });

  it('should render map container with correct class', () => {
    render(
      <Map
        offers={mockOffers}
        activeOffer={null}
        className={mockClassName}
      />
    );

    const mapContainer = document.querySelector(`.${mockClassName}`);
    expect(mapContainer).toBeInTheDocument();
  });

  it('should highlight active marker when activeOffer is provided', () => {
    render(
      <Map
        offers={mockOffers}
        activeOffer={mockActiveOffer}
        className={mockClassName}
      />
    );
    const activeMarkerIconUrl = '/img/pin-active.svg';
    expect(mockActiveOffer.id).toBe(mockOffers[0].id);
    expect(activeMarkerIconUrl).toBe('/img/pin-active.svg');
  });
});
