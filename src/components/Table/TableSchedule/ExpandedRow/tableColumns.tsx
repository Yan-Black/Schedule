import * as React from 'react';
import { EditTwoTone, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Tooltip,
  Space,
  Button,
  Typography,
  Table,
  Form,
  Popconfirm,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getKeyByValue } from 'helpers';
import { useState } from 'react';
import { addEvent, changeEvent, deleteEvent } from 'reducers/events';
import { TableColumn } from 'reducers/columnVisibility/models';
import { eventTypes } from '@constants';
import { ScheduleData } from '../models';
import getOriginData from '../EditableCell/getOriginData';
import EditableCell from '../EditableCell';
import sortEvents from './sortEvents';

const { Link } = Typography;

const tableColumns = (ind, events, sortedData) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const edit = (record: ScheduleData) => {
    form.setFieldsValue({
      startDay: '',
      startTime: '',
      name: '',
      type: '',
      place: '',
      materials: '',
      description: '',
      lector: '',
      comments: '',
      additional1: '',
      additional2: '',
      additional3: '',
      ...record,
    });
    setEditingKey(record.key.toString());
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ScheduleData;
      const newData = sortedData.slice();
      const index = newData.findIndex((item) => key === item.key);
      const changed = events.find((event) => event.id === newData[index].id);
      const changedInd = events.findIndex(
        (event) => event.id === newData[index].id,
      );
      const changedEvent = {
        ...changed,
        name: row.name,
        place: row.place,
        // to do: handle organizer editing properly (add new organizer to backend and set organizer id to
        // editing event or only set organizer id, if such organizer exists)
        organizerId: newLector,
        comment: row.comments,
        dateTime: newDate === '' ? events[changedInd].dateTime : newDate,
        week: newWeek === '' ? events[changedInd].week : newWeek,
        eventTime: newTime === '' ? events[changedInd].eventTime : newTime,
        description:
          newDescription === ''
            ? events[changedInd].description
            : newDescription,
        descriptionUrl:
          newLink === '' ? events[changedInd].descriptionUrl : newLink,
        type: newType === '' ? events[changedInd].type : newType,
        additional1: row.additional1,
        additional2: row.additional2,
        additional3: row.additional3,
      };
      dispatch(changeEvent({ changedEvent, changedInd }));
      setEditingKey('');
    } catch (errInfo) {
      window.console.log('Validate Failed:', errInfo);
    }
  };

  const del = (id: string) => {
    const delId = events.findIndex((event) => event.id === id);
    dispatch(deleteEvent(delId));
  };

  const cancel = () => {
    setEditingKey('');
  };


  const isEditing = (record: ScheduleData) =>
    record.key.toString() === editingKey;
  let newDate = '';
  let newWeek = '';
  let newTime = '';
  let newLink = '';
  let newDescription = '';
  let newType = '';
  let newLector = '';

  const columns = [
    {
      title: 'Date',
      dataIndex: 'startDay',
      key: 'startDay',
      width: 140,
      fixed: 'left',
      editable: true,
    },
    {
      title: 'Time',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 120,
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      editable: true,
      render: (text: string) => (
        <Link href="https://ant.design" target="_blank">
          {text}
        </Link>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 140,
      editable: true,
      filters: [
        {
          text: 'Online lection',
          value: 'Online lection',
        },
        {
          text: 'Task start',
          value: 'Task start',
        },
        {
          text: 'Task deadline',
          value: 'Task deadline',
        },
        {
          text: 'Optional task start',
          value: 'Optional task deadline',
        },
        {
          text: 'Self education',
          value: 'Self education',
        },
        {
          text: 'Test with grade',
          value: 'Test with grade',
        },
        {
          text: 'Test without grade',
          value: 'Test without grade',
        },
        {
          text: 'Cross-check start',
          value: 'Cross-check start',
        },
        {
          text: 'Cross-check deadline',
          value: 'Cross-check deadline',
        },
        {
          text: 'Meetup',
          value: 'Meetup',
        },
        {
          text: 'Interview start',
          value: 'Interview start',
        },
      ],
      onFilter: (value: string, record: ScheduleData) =>
        record.type.indexOf(value) === 0,
      render: (text: string) => {
        return (
          <div className="event-type">
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'place',
      width: 100,
      editable: true,
    },
    {
      title: 'Materials',
      dataIndex: 'materials',
      key: 'materials',
      width: 170,
      editable: true,
      ellipsis: {
        showTitle: false,
      },
      render: (address: React.ReactElement, record: ScheduleData) => {
        return (
          <Tooltip placement="topLeft" title={record.description}>
            <Link href={record.materials} target="_blank">
              {record.description}
            </Link>
          </Tooltip>
        );
      },
    },
    {
      title: 'Lector',
      dataIndex: 'lector',
      key: 'lector',
      width: 150,
      editable: true,
      render: (text: string) => {
        if (text) {
          return (
            <div className="lector">
              <span>{text}</span>
            </div>
          );
        }
        return null;
      },
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      width: 200,
      editable: true,
      ellipsis: {
        showTitle: false,
      },
      render: (address: React.ReactElement) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: 'Additional',
      dataIndex: 'additional1',
      key: 'additional1',
      width: 120,
      editable: true,
    },
    {
      title: 'Additional',
      dataIndex: 'additional2',
      key: 'additional2',
      width: 120,
      editable: true,
    },
    {
      title: 'Additional',
      dataIndex: 'additional3',
      key: 'additional3',
      width: 120,
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (_: ScheduleData, record: ScheduleData) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Space size="middle">
              <Tooltip title="Save">
                <Button
                  type="primary"
                  className="ok-btn"
                  onClick={() => save(record.key)}
                >
                  OK
                </Button>
              </Tooltip>
              <Popconfirm
                title="Sure to cancel?"
                placement="left"
                onConfirm={cancel}
              >
                <Tooltip title="Cansel">
                  <Button danger icon={<CloseOutlined />} />
                </Tooltip>
              </Popconfirm>
            </Space>
          </span>
        ) : (
          <Space size="middle">
            <Tooltip title="Edit">
              <Button
                type="dashed"
                icon={<EditTwoTone />}
                onClick={() => edit(record)}
              />
            </Tooltip>
            <Popconfirm
              title="Sure to delete?"
              placement="left"
              onConfirm={() => del(record.id)}
            >
              <Tooltip title="Delete">
                <Button danger icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return columns;
};

export default tableColumns;
