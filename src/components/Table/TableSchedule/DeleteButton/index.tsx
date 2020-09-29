import { DeleteOutlined } from '@ant-design/icons';
import { errorHandler, globalFunctions } from '@constants';
import { deleteEventUrl } from '@constants/api';
import { Popconfirm, Tooltip, Button } from 'antd';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent } from 'reducers/events';
import axios from 'utils';
import { DeleteButtonProps } from '../models';

const DeleteButton = ({
  setIsLoad,
  events,
  recordId,
  setEditingKey,
  record,
}: DeleteButtonProps): JSX.Element => {
  const dispatch = useDispatch();
  const del = async (id: string) => {
    const delId = events.findIndex((event) => event.id === id);
    try {
      setEditingKey(record.key.toString());
      setIsLoad(true);
      await axios.delete(deleteEventUrl(id));
      dispatch(deleteEvent(delId));
    } catch (e) {
      errorHandler();
    } finally {
      setIsLoad(false);
      setEditingKey('');
    }
  };

  return (
    <Popconfirm
      title="Sure to delete?"
      placement="left"
      onConfirm={() => del(recordId)}
    >
      <Tooltip title="Delete">
        <Button danger icon={<DeleteOutlined />} />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteButton;
