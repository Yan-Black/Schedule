import * as React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import imageError from '../../assets/images/error-boundary.png';
import { IErrorIndicator } from './models';

import './index.scss';

// eslint-disable-next-line react/prop-types
const ErrorIndicator: React.FC<IErrorIndicator> = ({ handleCloseError }) => {
  const history = useHistory();

  const handleButton = () => {
    history.push('/');
    handleCloseError();
  };

  return (
    <div className="error">
      <img src={imageError} alt="" />
      <span>Something went wrong !</span>
      <span>We are working on it!</span>
      <Button type="primary" onClick={handleButton}>
        Go Home
      </Button>
    </div>
  );
};

export default ErrorIndicator;
