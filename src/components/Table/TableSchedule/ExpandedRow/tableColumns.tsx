import * as React from 'react';
import { Tooltip, Space, Typography, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useState } from 'react';
import { StudyEvent } from 'reducers/events/models';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { filters } from '@constants/_tableConstants';
import { setEventPageId } from 'reducers/eventId';
import { FormFields, MergedColumnsProps, ScheduleData } from '../models';
import OkButton from '../OkButton';
import CloseButton from '../CloseButton';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';

const { Link } = Typography;

const tableColumns = (
  events: StudyEvent[],
  sortedData: ScheduleData[],
  windowSize: number,
): { mergedColumns: MergedColumnsProps[]; form: FormInstance<FormFields> } => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const organizers = useSelector((state: RootState) => state.organizers.data);
  const { column } = useSelector((state: RootState) => state);
  const [editingKey, setEditingKey] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const isEditing = (record: ScheduleData) =>
    record.key.toString() === editingKey;

  const columns = [
    {
      title: 'Date',
      dataIndex: 'startDay',
      key: 'startDay',
      width: windowSize > 600 ? 140 : 100,
      fixed: windowSize > 600 ? 'left' : '',
      editable: true,
    },
    {
      title: 'Time',
      dataIndex: 'startTime',
      key: 'startTime',
      width: windowSize > 600 ? 120 : 100,
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: windowSize > 600 ? 150 : 100,
      editable: true,
      render: (text: string, record: ScheduleData) => (
        <Link
          href="/"
          target="_blank"
          onClick={(e) => {
            console.log(record.id);
            e.preventDefault();
            dispatch(setEventPageId(record.id));
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: windowSize > 600 ? 140 : 100,
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
      width: windowSize > 600 ? 170 : 100,
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
      width: windowSize > 600 ? 150 : 100,
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
      width: windowSize > 600 ? 200 : 100,
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
      title: column.additional1 ? column.additional1.name : 'Additional',
      dataIndex: 'additional1',
      key: 'additional1',
      width: windowSize > 600 ? 120 : 100,
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
      title: column.additional2 ? column.additional2.name : 'Additional',
      dataIndex: 'additional2',
      key: 'additional2',
      width: windowSize > 600 ? 120 : 100,
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
      title: column.additional3 ? column.additional3.name : 'Additional',
      dataIndex: 'additional3',
      key: 'additional3',
      width: windowSize > 600 ? 120 : 100,
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
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      width: windowSize > 600 ? 90 : 60,
      fixed: 'right',
      className: 'action-wrapper',
      render: (_: ScheduleData, record: ScheduleData) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Space
              size="small"
              direction={windowSize > 600 ? 'horizontal' : 'vertical'}
            >
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
          <Space
            size="small"
            direction={windowSize > 600 ? 'horizontal' : 'vertical'}
          >
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
              setEditingKey={setEditingKey}
              record={record}
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
        windowSize,
      }),
    };
  });

  return { mergedColumns, form };
};

export default tableColumns;
