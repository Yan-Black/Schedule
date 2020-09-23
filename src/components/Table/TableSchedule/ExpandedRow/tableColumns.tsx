import * as React from 'react';
import { Tooltip, Space, Typography, Form } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useState } from 'react';
import { StudyEvent } from 'reducers/events/models';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { filters } from '@constants/_tableConstants';
import { FormFields, MergedColumnsProps, ScheduleData } from '../models';
import OkButton from '../OkButton';
import CloseButton from '../CloseButton';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';

const { Link } = Typography;

const tableColumns = (
  events: StudyEvent[],
  sortedData: ScheduleData[],
): { mergedColumns: MergedColumnsProps[]; form: FormInstance<FormFields> } => {
  const [form] = Form.useForm();
  const organizers = useSelector((state: RootState) => state.organizers.data);
  const [editingKey, setEditingKey] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const isEditing = (record: ScheduleData) =>
    record.key.toString() === editingKey;

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
      filters,
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
              <OkButton
                recordKey={record.key}
                form={form}
                setEditingKey={setEditingKey}
                setIsLoad={setIsLoad}
                sortedData={sortedData}
                organizers={organizers}
              />
              <CloseButton setEditingKey={setEditingKey} />
            </Space>
          </span>
        ) : (
          <Space size="middle">
            <EditButton
              recordData={record}
              setEditingKey={setEditingKey}
              organizers={organizers}
              form={form}
            />
            <DeleteButton
              setIsLoad={setIsLoad}
              events={events}
              recordId={record.id}
            />
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
    else if (col.dataIndex === 'type' || col.dataIndex === 'lector')
      type = 'select';
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
        isLoad,
      }),
    };
  });

  return { mergedColumns, form };
};

export default tableColumns;
