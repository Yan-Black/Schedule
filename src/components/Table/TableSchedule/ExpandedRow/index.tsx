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
import { getKeyByValue } from 'utils';
import { useState } from 'react';
import { changeEvent } from 'reducers/events';
import { TableColumn } from 'reducers/columnVisibility/models';
import { eventTypes } from '@constants';
import { ScheduleData } from '../models';
import getOriginData from '../EditableCell/getOriginData';
import EditableCell from '../EditableCell';

const { Link } = Typography;

const expandedRow = (ind: number): JSX.Element => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const columnVisibility: TableColumn = useSelector(
    (state: RootState) => state.columnVisibility,
  );
  const eventTypeColors = useSelector((state: RootState) => state.colors);
  const events = useSelector((state: RootState) => state.events.data);
  const originData = getOriginData(events, ind);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: ScheduleData) =>
    record.key.toString() === editingKey;
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ScheduleData;
      const newData = [...originData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const changed = events.find((event) => event.id === newData[index].id);
        const changedInd = events.findIndex(
          (event) => event.id === newData[index].id,
        );
        const changedEvent = {
          ...changed,
          name: row.name,
          place: row.place,
          lector: row.lector,
          comment: row.comments,
          // to do: add additional fields and fields with not string data type
        };
        dispatch(changeEvent({ changedEvent, changedInd }));
        setEditingKey('');
      } else {
        // to do: add case of new event in schedule (adding new row to table)
        setEditingKey('');
      }
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
      lector: '',
      comments: '',
      additional1: '',
      additional2: '',
      additional3: '',
      ...record,
    });
    setEditingKey(record.key.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  const columns = [
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
      width: 70,
      fixed: 'left',
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
      width: 150,
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
        return (
          <div className="lector">
            <span>{text}</span>
          </div>
        );
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
      key: 'additional',
      width: 105,
      editable: true,
    },
    {
      title: 'Additional',
      dataIndex: 'additional2',
      key: 'additional',
      width: 105,
      editable: true,
    },
    {
      title: 'Additional',
      dataIndex: 'additional3',
      key: 'additional',
      width: 105,
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
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <Button danger icon={<CloseOutlined />} />
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
            <Popconfirm title="Sure to delete?">
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ScheduleData) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const filteredColumns = [];
  mergedColumns.map((col) => {
    if (columnVisibility[col.key]) filteredColumns.push(col);
    return col;
  });

  return (
    <>
      <div className="add-row-button-wrapper">
        <Button type="primary">Add event</Button>
      </div>
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
          dataSource={originData}
          scroll={{ y: 400 }}
          rowClassName={(record) => {
            const type = getKeyByValue(eventTypes, record.type);
            const rowClass = eventTypeColors[type] as string;
            return rowClass;
          }}
        />
      </Form>
    </>
  );
};

export default expandedRow;
