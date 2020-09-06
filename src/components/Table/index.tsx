import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store';
import { deleteEvent } from 'reducers/events';
import './index.scss';

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const events = useSelector((state: RootState) => state.events.data);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    dispatch(deleteEvent(parseInt(target.id, 10)));
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <ul>
      {events.map(({ place }, i) => (
        <li key={Math.random()}>
          {place}
          <button type="button" onClick={handleClick} id={`${i}`}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Table;
