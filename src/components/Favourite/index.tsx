import React from 'react';
import { HeartTwoTone } from '@ant-design/icons';

import { globalFunctions } from '@constants';

import './index.scss';

const Favourite: React.FC = () => {
  const handleListFavourite = () => {
    globalFunctions.showModalWindow('favourite');
  };

  return (
    <button type="button" onClick={handleListFavourite}>
      <HeartTwoTone style={{ cursor: 'pointer' }} twoToneColor="#eb2f96" />
    </button>
  );
};
export default Favourite;
