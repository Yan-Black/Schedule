import * as React from 'react';
import { Table, Badge, Space, Typography, Tooltip, Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import './index.scss';
import { ColumnsType } from 'antd/lib/table/Table';
import { getKeyByValue } from 'utils';
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import { eventTypes } from '../../../constants';

interface User {
  key: number;
  name: string;
}

interface ScheduleData {
  comments?: string;
  deadlineDay?: string;
  deadlineTime?: string;
  key: number;
  name: string;
  startDay?: string;
  startTime?: string;
  type?: string;
}

const { Text, Link } = Typography;

const TableSchedule: React.FC = () => {
  const columnVisibility = useSelector((state: RootState) => state.columnVisibility);
  const eventTypeColors = useSelector((state: RootState) => state.eventTypeColors);
  const expandedRowRender = () => {
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
              <span>
                {text}
                {/* <Badge status={(text === 'Lection' && 'warning') || (text === 'Test' && 'error') || 'success'} /> */}
                {/* <Text
                type={(text === 'Lection' && 'warning') || (text === 'Test' && 'danger') || 'success'}
                keyboard
              >
                {text}
              </Text> */}
              </span>
            </div>
          );
        },
      },
      {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
        width: 100,
        render: (text, row, index) => {
          const place =
            ((index === 1 || index === 3 || index === 7) && 'Online') ||
            ((index === 2 || index === 6 || index === 8 || index === 12) && 'Online') ||
            'Offline';
          return (
            (place === 'Online' && <Text>Online</Text>) || (
              <Link href="https://ant.design" target="_blank">
                Offline
              </Link>
            )
          );
        },
      },
      {
        title: 'Materials',
        dataIndex: 'materials',
        key: 'materials',
        width: 150,
        render: () => (
          <>
            <Link className="materials-link" href="https://ant.design" target="_blank">
              Link to materials
            </Link>
            <Link className="materials-link" href="https://ant.design" target="_blank">
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
        render: (text, row, index) => {
          const rating = (-1) ** 2 * index - 1;
          return (
            <div>
              <Badge
                showZero
                size="small"
                offset={[3, -2]}
                count={rating}
                overflowCount={99}
                className={(rating > 0 && 'rating-positive') || (rating === 0 && 'no-rating')}
              >
                <Text
                  code
                  // type={
                  //   ((index === 1 || index === 3 || index === 7) && 'success') ||
                  //   ((index === 2 || index === 4 || index === 10) && 'danger') ||
                  //   ((index === 5 || index === 6 || index === 12) && 'warning') ||
                  //   'secondary'
                  // }
                >
                  Some lector
                </Text>
              </Badge>
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
    for (let i = 0; i < 15; ++i) {
      const taskType =
        ((i === 1 || i === 13) && 'Online lection') ||
        ((i === 2 || i === 14) && 'Self education') ||
        (i === 3 && 'Task start') ||
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
      data.push({
        key: i,
        startDay: new Date().toLocaleDateString(),
        startTime: new Date().toLocaleTimeString(),
        name: `Task number ${i + 1}`,
        deadlineDay: new Date().toLocaleDateString(),
        deadlineTime: new Date().toLocaleTimeString(),
        comments:
          'Решения всех заданий доступны после 20-минутной паузы. Для проверки самостоятельности решения  заданий нужно посмотреть и послушать как студент решает пройденные им таски',
        type: taskType,
      });
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

  const columns = [
    {
      title: 'RS School Schedule',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const data: ScheduleData[] = [];

  const millisecondsInWeek = 604800000;

  for (let i = 0; i < 25; ++i) {
    const currDate = new Date(Date.now() + millisecondsInWeek * i);
    const currDay = currDate.getDate();
    const currMonth = currDate.getMonth();
    const currYear = currDate.getFullYear();
    const nextDate = new Date(Date.now() + millisecondsInWeek * i + millisecondsInWeek);
    const nextDay = nextDate.getDate();
    const nextMonth = nextDate.getMonth();
    const nextYear = nextDate.getFullYear();
    data.push({
      key: i,
      name: `Week ${i + 1}
            (${currDay}.${currMonth}.${currYear}
            - ${nextDay}.${nextMonth}.${nextYear})`,
    });
  }

  return (
    <Table<ScheduleData>
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      defaultExpandedRowKeys={[2]}
      dataSource={data}
      pagination={false}
      rowClassName={(record, index) => `currentWeek${index}`}
      scroll={{ y: 500 }}
    />
  );
};

export default TableSchedule;
