import './index.scss';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

const CoreJS: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div>CoreJS Task</div>
    </>
  );
};

export default CoreJS;
