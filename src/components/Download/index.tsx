import React from 'react';
import './index.scss';
import { DownloadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { showDownloadModal } from 'reducers/modal';

const Download: React.FC = () => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(showDownloadModal());
    // console.log(store.getState().modal.visibility);
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
