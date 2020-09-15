import * as React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import './index.scss';

const Table: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);
  return isLoading && <p>loading...</p>;
};

export default Table;
