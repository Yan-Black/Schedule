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
// import { eventTypes } from '../../../../constants';
import { eventTypes } from '@constants';
import { ScheduleData } from '../models';
import getOriginData from '../EditableCell/getOriginData';
import EditableCell from '../EditableCell';
import sortEvents from './sortEvents';

const { Link } = Typography;

const expandedRow = (ind: number): JSX.Element => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const columnVisibility: TableColumn = useSelector(
    (state: RootState) => state.column,
  );
  const { currentRole } = useSelector((state: RootState) => state.role);
  const eventTypeColors = useSelector((state: RootState) => state.colors);
  const events = useSelector((state: RootState) => state.events.data);
  const organizers = useSelector((state: RootState) => state.organizers.data);
  const originData = getOriginData(events, organizers, ind);
  const sortedData = originData.slice().sort(sortEvents);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: ScheduleData) =>
    record.key.toString() === editingKey;
  let newDate = '';
  let newWeek = '';
  let newTime = '';
  let newLink = '';
  let newDescription = '';
  let newType = '';

  const dateHandler = (date: moment.Moment, dateString: string) => {
    const nextDate = dateString.split('.');
    const day = nextDate[0];
    const month = nextDate[1];
    const year = nextDate[2];
    const dayOfWeek = new Date(+year, +month - 1, +day).toString().slice(0, 3);
    newDate = `${dayOfWeek}, ${dateString}`;
  };

  const weekHandler = (value: number | string) => {
    newWeek = value.toString();
  };

  const timeHandler = (time: moment.Moment, timeString: string) => {
    newTime = timeString.slice(0, 5);
  };

  const linkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    newLink = event.target.value;
  };

  const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    newDescription = event.target.value;
  };

  const typeHandler = (value: string) => {
    newType = value;
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
        organizerId: row.lector,
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

  const del = (id: string) => {
    const delId = events.findIndex((event) => event.id === id);
    dispatch(deleteEvent(delId));
  };

  const cancel = () => {
    setEditingKey('');
  };

  const add = () => {
    const newItem = {
      dateTime:
        sortedData.length > 0
          ? sortedData[0].startDay
          : events[events.length - 1].dateTime,
      eventTime: '00:00',
      type: 'no type',
      week: sortedData.length > 0 ? sortedData[0].week : ind,
    };
    dispatch(addEvent(newItem));
  };

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
      fixed: 'left',
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
      editable: true,
      render: (text) => (
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

  const mergedColumns = columns.map((col) => {
    let type: string;

    if (col.dataIndex === 'startDay') type = 'date';
    else if (col.dataIndex === 'startTime') type = 'time';
    else if (col.dataIndex === 'week') type = 'number';
    else if (col.dataIndex === 'type') type = 'select';
    else type = 'text';

    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ScheduleData) => ({
        record,
        inputType: type,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        handleDate: dateHandler,
        handleWeek: weekHandler,
        handleTime: timeHandler,
        handleLink: linkHandler,
        handleDescription: descriptionHandler,
        handleType: typeHandler,
      }),
    };
  });

  const filteredColumns = [];
  mergedColumns.map((col) => {
    if (columnVisibility[col.key] && currentRole === 'Mentor')
      filteredColumns.push(col);
    else if (columnVisibility[col.key] && col.key !== 'operation')
      filteredColumns.push(col);
    return col;
  });

  return (
    <>
      {sortedData.length > 0 && (
        <>
          {currentRole === 'Mentor' && (
            <div className="add-row-button-wrapper">
              <Button type="primary" onClick={add}>
                Add event
              </Button>
            </div>
          )}
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              columns={filteredColumns}
              pagination={false}
              dataSource={sortedData}
              scroll={{ y: 400 }}
              rowClassName={(record) => {
                const type = getKeyByValue(eventTypes, record.type);
                const rowClass = eventTypeColors[type] as string;
                return rowClass;
              }}
            />
          </Form>
        </>
      )}
    </>
  );
};

export default expandedRow;
