import * as React from 'react';
import { Table, Badge, Menu, Dropdown, Space, Typography, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.scss';

interface User {
  key: number;
  name: string;
}

const { Text, Link } = Typography;

const menu = (
  <Menu>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item>Delete</Menu.Item>
  </Menu>
);

const TableSchedule: React.FC = () => {
  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'startDay',
        key: 'startDay',
      },
      {
        title: 'Time',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
          <Link href="https://ant.design" target="_blank">
            {text}
          </Link>
        ),
      },
      {
        title: 'Type',
        key: 'type',
        render: (text, row, index) => {
          const taskType =
            ((index === 1 || index === 3 || index === 7) && 'Lection') ||
            ((index === 2 || index === 6 || index === 8 || index === 12) && 'Test') ||
            'Task';
          return (
            <span>
              <Badge status={(taskType === 'Lection' && 'warning') || (taskType === 'Test' && 'error') || 'success'} />
              <Text
                type={(taskType === 'Lection' && 'warning') || (taskType === 'Test' && 'danger') || 'success'}
                keyboard
              >
                {taskType}
              </Text>
            </span>
          );
        },
      },
      // {
      //   title: 'Deadline',
      //   children: [
      //     {
      //       title: 'Date',
      //       dataIndex: 'deadlineDay',
      //       key: 'deadlineDay',
      //     },
      //     {
      //       title: 'Time',
      //       dataIndex: 'deadlineTime',
      //       key: 'deadlineTime',
      //     },
      //   ],
      // },
      {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
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
        render: () => (
          <>
            <Link className="materials-link" href="https://ant.design" target="_blank">
              Link to materials
            </Link>
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
                  type={
                    ((index === 1 || index === 3 || index === 7) && 'success') ||
                    ((index === 2 || index === 4 || index === 10) && 'danger') ||
                    ((index === 5 || index === 6 || index === 12) && 'warning') ||
                    'secondary'
                  }
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
        ellipsis: {
          showTitle: false,
        },
        render: (address) => (
          <Tooltip placement="topLeft" title={address}>
            {address}
          </Tooltip>
        ),
      },
      {
        title: 'Task action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a href="https://ant.design">Edit</a>
            <a href="https://ant.design">Delete</a>
            {/* <Dropdown overlay={menu}>
              <a href="https://ant.design">
                More
                <DownOutlined />
              </a>
            </Dropdown> */}
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 15; ++i) {
      data.push({
        key: i,
        startDay: new Date().toLocaleDateString(),
        startTime: new Date().toLocaleTimeString(),
        name: `Task number ${i + 1}`,
        deadlineDay: new Date().toLocaleDateString(),
        deadlineTime: new Date().toLocaleTimeString(),
        comments:
          'Решения всех заданий доступны после 20-минутной паузы. Для проверки самостоятельности решения  заданий нужно посмотреть и послушать как студент решает пройденные им таски',
      });
    }
    return <Table<User> bordered columns={columns} dataSource={data} pagination={false} scroll={{ y: 450 }} />;
  };

  const columns = [
    {
      title: 'RS School Schedule',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const data: User[] = [];

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
    <>
      <Table<User>
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        defaultExpandedRowKeys={[2]}
        dataSource={data}
        rowClassName={(record, index) => `currentWeek${index}`}
      />
    </>
  );
};

export default TableSchedule;
