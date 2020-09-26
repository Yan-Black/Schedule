import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoords } from 'requests';
import Map from './Map';
import './index.scss';

const EventMap: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoords('Улица Фабрициуса 4, Минск'));
  }, []);

  return (
    <div className="map__wrapper">
      <Map />
    </div>
  );
};

export default EventMap;
