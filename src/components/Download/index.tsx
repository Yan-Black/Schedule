import React from 'react';
import './index.scss';
import { DownloadOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import { globalFunctions } from '../../@constants';
=======
import { globalFunctions } from '../../constants';
>>>>>>> b060985... feat: add modal window call

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
