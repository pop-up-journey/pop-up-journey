'use client';

import type { LatLng } from '@/features/popup-detail/hooks/useGeocode';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface MapContainerProps {
  center: LatLng;
  level?: number;
  width?: string;
  height?: string;
}

export default function MapContainer({ center, level = 3, width = '100%', height = '400px' }: MapContainerProps) {
  return (
    <section className="mb-6 w-full max-w-4xl transform overflow-hidden rounded-2xl shadow-2xl transition-transform hover:-translate-y-2">
      <Map id="map" center={center} level={level} style={{ width, height }}>
        <MapMarker position={center} />
      </Map>
    </section>
  );
}
