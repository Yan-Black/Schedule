import { CloseOutlined } from '@ant-design/icons';
import { Popconfirm, Tooltip, Button } from 'antd';
import * as React from 'react';
import { CloseButtonProps } from '../models';

const CloseButton = ({ setEditingKey }: CloseButtonProps): JSX.Element => {
  const cancel = () => {
    setEditingKey('');
  };

  return (
    <Popconfirm title="Sure to cancel?" placement="left" onConfirm={cancel}>
      <Tooltip title="Cansel">
        <Button danger icon={<CloseOutlined />} />
      </Tooltip>
    </Popconfirm>
  );
};

export default CloseButton;
