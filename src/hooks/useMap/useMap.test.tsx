import React from 'react';
import { render, screen } from '@testing-library/react';
import leaflet from 'leaflet';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import useMap from './useMap';
import { Location } from '../../types/location';

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
  },
}));

interface MockMap {
  setView: jest.Mock;
}

const MapWrapper = ({ location }: { location: Location }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  useMap(mapRef, location);
  return <div data-testid="map-container" ref={mapRef}></div>;
};

describe('useMap', () => {
  const mockLocation: Location = {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize map when mapRef is available', () => {
    render(<MapWrapper location={mockLocation} />);
    const mapContainer = screen.getByTestId('map-container');

    expect(mapContainer).toBeInTheDocument();
    expect(leaflet.map).toHaveBeenCalledTimes(1);
    expect(leaflet.map).toHaveBeenCalledWith(mapContainer, {
      center: { lat: mockLocation.latitude, lng: mockLocation.longitude },
      zoom: mockLocation.zoom,
    });
    expect(leaflet.tileLayer).toHaveBeenCalledTimes(1);
  });

  it('should update map view when location changes', () => {
    const { rerender } = render(<MapWrapper location={mockLocation} />);

    const newLocation: Location = {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12,
    };

    rerender(<MapWrapper location={newLocation} />);

    const mockMap = (leaflet.map as jest.Mock).mock.results[0].value as MockMap;
    expect(mockMap.setView).toHaveBeenCalledWith(
      { lat: newLocation.latitude, lng: newLocation.longitude },
      newLocation.zoom
    );
  });

  it('should initialize map only once', () => {
    const { rerender } = render(<MapWrapper location={mockLocation} />);
    rerender(<MapWrapper location={mockLocation} />);

    expect(leaflet.map).toHaveBeenCalledTimes(1);
  });

  it('should not initialize map if mapRef is null', () => {
    const MapWithoutRef = ({ location }: { location: Location }) => {
      const nullRef = { current: null };
      useMap(nullRef, location);
      return <div data-testid="map-container"></div>;
    };

    render(<MapWithoutRef location={mockLocation} />);
    expect(leaflet.map).not.toHaveBeenCalled();
  });
});
