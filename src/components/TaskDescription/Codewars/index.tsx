import './index.scss';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

const Codewars: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div>Codewars Task</div>
    </>
  );
};

export default Codewars;
