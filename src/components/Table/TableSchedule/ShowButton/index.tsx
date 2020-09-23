import { Button } from 'antd';
import * as React from 'react';
import { ShowButtonProps } from '../models';

const ShowButton = ({
  hiddenRowKeys,
  setSelectedRowKeys,
  setHiddenRowKeys,
}: ShowButtonProps): JSX.Element => {
  const showHandler = () => {
    setSelectedRowKeys([]);
    setHiddenRowKeys([]);
  };

  return (
    <Button
      type="primary"
      disabled={hiddenRowKeys.length === 0}
      onClick={showHandler}
    >
      Show
    </Button>
  );
};

export default ShowButton;
