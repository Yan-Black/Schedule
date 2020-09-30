import { Button } from 'antd';
import * as React from 'react';
import { ShowButtonProps } from '../models';

const ShowButton = ({
  hiddenRowKeys,
  setSelectedRowKeys,
  setHiddenRowKeys,
  fontSize,
}: ShowButtonProps): JSX.Element => {
  const showHandler = () => {
    setSelectedRowKeys([]);
    setHiddenRowKeys([]);
  };

  return (
    <Button
      className={`font-size-${fontSize}`}
      type="primary"
      disabled={hiddenRowKeys.length === 0}
      onClick={showHandler}
    >
      Show
    </Button>
  );
};

export default ShowButton;
