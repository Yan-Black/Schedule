import * as React from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { RootState } from 'store';
// import { deleteEvent } from 'reducers/events';
// import { deleteOrganizer } from 'reducers/organizers';
import './index.scss';
import TableSchedule from './TableSchedule';

const Table: React.FC = () => {
  return (
    <div className="container">
      <TableSchedule />
    </div>
    // const dispatch = useDispatch();
    // const isLoading = useSelector((state: RootState) => state.events.loading);
    // const events = useSelector((state: RootState) => state.events.data);
    // const organizers = useSelector((state: RootState) => state.organizers.data);

    // const handleClickOnEvent = (e: React.MouseEvent) => {
    //   const target = e.target as HTMLButtonElement;
    //   dispatch(deleteEvent(parseInt(target.id, 10)));
    // };

    // const handleClickOnOrganizer = (e: React.MouseEvent) => {
    //   const target = e.target as HTMLButtonElement;
    //   dispatch(deleteOrganizer(parseInt(target.id, 10)));
    // };

    // if (isLoading) {
    //   return <p>loading...</p>;
    // }

    // return (
    //   <>
    //     <ul>
    //       {events.map(({ place }, i) => (
    //         <li key={Math.random()}>
    //           {place}
    //           {'  '}
    //           <button type="button" onClick={handleClickOnEvent} id={`${i}`}>
    //             X
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //     <ul>
    //       {organizers.map(({ name }, i) => (
    //         <li key={Math.random()}>
    //           {name}
    //           {'  '}
    //           <button type="button" onClick={handleClickOnOrganizer} id={`${i}`}>
    //             X
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   </>
  );
};

export default Table;
