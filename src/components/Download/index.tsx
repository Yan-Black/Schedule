import React from 'react';
import './index.scss';
import { DownloadOutlined } from '@ant-design/icons';
import { globalFunctions } from '../../constants';

const Download: React.FC = () => {
  const clickHandler = () => {
    globalFunctions.showModalWindow('download');
  };
  return (
    <div onClick={clickHandler}>
      <DownloadOutlined
        onClick={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
};
export default Download;
