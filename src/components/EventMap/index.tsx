import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoords } from 'requests';
import Map from './Map';
import './index.scss';

interface EventMapProp {
  address: string;
}

const EventMap: React.FC<EventMapProp> = ({ address }: EventMapProp) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoords(address));
  }, [address]);

  return <Map />;
};

export default EventMap;
