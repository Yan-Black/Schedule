import { DeleteOutlined } from '@ant-design/icons';
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
}: DeleteButtonProps): JSX.Element => {
  const dispatch = useDispatch();
  const del = async (id: string) => {
    const delId = events.findIndex((event) => event.id === id);
    try {
      setIsLoad(true);
      await axios.delete(deleteEventUrl(id));
      dispatch(deleteEvent(delId));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoad(false);
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