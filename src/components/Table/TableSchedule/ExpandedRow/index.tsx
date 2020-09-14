import * as React from 'react';
import { EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import { Badge, Tooltip, Space, Button, Typography, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { getKeyByValue } from 'utils';
import { eventTypes } from '../../../../constants';
import { User, ScheduleData } from '../models';

const { Text, Link } = Typography;

const expandedRow = (ind: number): JSX.Element => {
  const columnVisibility = useSelector((state: RootState) => state.columnVisibility);
  const eventTypeColors = useSelector((state: RootState) => state.eventTypeColors);
  const events = useSelector((state: RootState) => state.events.data);
  const columns: ColumnsType<User> = [
    {
      title: 'Date',
      dataIndex: 'startDay',
      key: 'startDay',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Time',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
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
      width: 120,
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
      onFilter: (value: string, record: ScheduleData) => record.type.indexOf(value) === 0,
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
    },
    {
      title: 'Materials',
      dataIndex: 'materials',
      key: 'materials',
      width: 150,
      render: (text: string) => (
        <>
          <Link className="materials-link" href={text} target="_blank">
            Link to materials
          </Link>
        </>
      ),
    },
    {
      title: 'Lector',
      dataIndex: 'lector',
      key: 'lector',
      width: 150,
      render: () => {
        return (
          <div className="lector">
            <span>Some lector</span>
          </div>
        );
      },
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      width: 200,
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
      key: 'additional',
      width: 105,
    },
    {
      title: 'Additional',
      dataIndex: 'additional2',
      key: 'additional',
      width: 105,
    },
    {
      title: 'Additional',
      dataIndex: 'additional3',
      key: 'additional',
      width: 105,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: () => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button type="dashed" icon={<EditTwoTone />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredColumns = [];
  columns.map((col) => {
    if (columnVisibility[col.key]) filteredColumns.push(col);
    return col;
  });

  const data = [];
  for (let i = 0; i < events.length; ++i) {
    if (events[i].week === ind.toString()) {
      const taskType =
        ((i === 1 || i === 13) && 'Online lection') ||
        ((i === 2 || i === 14 || events[i].type === 'self-education') && 'Self education') ||
        i === 3 ||
        (events[i].type === 'Выдача таска' && 'Task start') ||
        (i === 4 && 'Cross-check start') ||
        (i === 5 && 'Task deadline') ||
        (i === 6 && 'Optional task start') ||
        (i === 7 && 'Meetup') ||
        (i === 8 && 'Test with grade') ||
        (i === 9 && 'Optional task deadline') ||
        (i === 10 && 'Cross-check deadline') ||
        (i === 11 && 'Test without grade') ||
        (i === 12 && 'Interview start') ||
        'Task start';
      const time =
        ((events[i].type === 'Task deadline' ||
          events[i].type === 'Optional task deadline' ||
          events[i].type === 'Cross-check deadline') &&
          '23:59:59') ||
        ((events[i].type === 'Meetup' ||
          events[i].type === 'Test with grade' ||
          events[i].type === 'Test without grade') &&
          new Date().toLocaleTimeString()) ||
        new Date().toLocaleTimeString();
      data.push({
        key: i,
        startDay: events[i].dateTime,
        startTime: time,
        name: events[i].name,
        place: events[i].place,
        materials: events[i].descriptionUrl,
        comments: events[i].comment || '-',
        type: taskType,
      });
    }
  }

  return (
    <>
      <div className="add-row-button-wrapper">
        <Button type="primary">Add event</Button>
      </div>

      <Table<ScheduleData>
        bordered
        columns={filteredColumns}
        pagination={false}
        dataSource={data}
        scroll={{ y: 400 }}
        rowClassName={(record) => {
          const type = getKeyByValue(eventTypes, record.type);
          const rowClass = eventTypeColors[type] as string;
          return rowClass;
        }}
      />
    </>
  );
};

export default expandedRow;
