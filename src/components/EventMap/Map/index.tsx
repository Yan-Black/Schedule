import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import mapboxgl from 'mapbox-gl';
import './index.scss';
import { updateCoords } from 'reducers/eventCoords';

const Map: React.FC = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.role.currentRole);
  const { lat: latitude, lng: longtitude } = useSelector(
    (state: RootState) => state.eventCoords,
  );

  const [map, setMap] = useState<mapboxgl.Map>(null);
  const [zoom, setZoom] = useState(16);
  const [long, setLong] = useState(longtitude);
  const [lat, setLat] = useState(latitude);
  const mapContainer = useRef(null);

  const marker = new mapboxgl.Marker({ draggable: role === 'Mentor' });

  const dragEnd = () => {
    const { lng, lat } = marker.getLngLat();
    dispatch(updateCoords({ lat, lng }));
  };

  useEffect(() => {
    if (map) {
      map.flyTo({ center: [longtitude, latitude], essential: true });
      if (map.getCanvasContainer().lastElementChild.tagName === 'DIV') {
        map.getCanvasContainer().lastElementChild.remove();
      }
      map.on('zoomend', () => map.resize());
      marker
        .setLngLat([longtitude, latitude])
        .addTo(map)
        .on('dragend', dragEnd);
      setLong(longtitude);
      setLat(latitude);
      setZoom(16);
    }
  }, [map, longtitude, latitude, role]);

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoieWFuYmxhY2siLCJhIjoiY2thcGc1anZnMWV1bjJybXZlczFxZWNneiJ9.GQmY2INRmLW50ynlijmI3A';
    const initializeMap = ({
      setMap,
      mapContainer,
    }: {
      setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map>>;
      mapContainer: React.MutableRefObject<HTMLDivElement>;
    }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [long, lat],
        zoom,
      });

      map.on('load', () => setMap(map));

      map.on('move', () => {
        setLong(Number(map.getCenter().lng.toFixed(2)));
        setLat(Number(map.getCenter().lat.toFixed(2)));
        setZoom(Number(map.getZoom().toFixed(2)));
      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainer });
    }
  }, [map, long, lat, zoom]);

  return (
    <div
      ref={(el) => {
        mapContainer.current = el;
      }}
      className="mapContainer"
    />
  );
};

export default Map;
