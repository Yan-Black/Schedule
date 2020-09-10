import * as React from 'react';
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import './index.scss';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0ZW1kciIsImEiOiJja2FzaHZwazUwanJzMnhvY2FpeHB3Z2hkIn0.zee-6qsXHm-SnmoqABnklQ';

const Map: React.FC = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [27.5666, 53.9000],
      zoom: 12.5,
      attributionControl: false,
    });

    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
