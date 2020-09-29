import { Button } from 'antd';
import * as React from 'react';
import { HideButtonProps } from '../models';

const HideButton = ({
  selectedRowKeys,
  setHiddenRowKeys,
  fontSize,
}: HideButtonProps): JSX.Element => {
  const hideHandler = () => setHiddenRowKeys(selectedRowKeys);
  return (
    <Button
      className={`hide-btn font-size-${fontSize}`}
      type="primary"
      disabled={selectedRowKeys.length === 0}
      onClick={hideHandler}
    >
      Hide
    </Button>
  );
};

export default HideButton;
