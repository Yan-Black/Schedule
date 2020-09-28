import * as React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import imageError from 'assets/images/error-boundary.png';
import { IErrorIndicator } from './models';

import './index.scss';

const ErrorIndicator: React.FC<IErrorIndicator> = ({
  handleCloseError,
}: IErrorIndicator) => {
  const history = useHistory();

  const handleButton = () => {
    history.push('/');
    handleCloseError();
  };

  return (
    <div className="error">
      <img src={imageError} alt="" />
      <p>Something went wrong !</p>
      <p>We are working on it!</p>
      <Button type="primary" onClick={handleButton}>
        Go Home
      </Button>
    </div>
  );
};

export default ErrorIndicator;
