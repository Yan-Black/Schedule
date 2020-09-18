import * as React from 'react';
import { Input, Form, DatePicker, TimePicker, InputNumber, Space } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { EditableCellProps } from '../models';
import { getDate, getTime } from './getOriginData';

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  handleDate,
  handleWeek,
  ...restProps
}: EditableCellProps) => {

  let inputNode = <Input size="small" />;
  if (inputType === 'date') {
    inputNode = (
      <Space direction="vertical">
        <DatePicker
          defaultValue={moment(getDate(record), 'DD.MM.YYYY')}
          format="DD.MM.YYYY"
          size="small"
          onChange={handleDate}
        />
        <span>Week</span>
        <InputNumber defaultValue={+record.week} min={0} max={50} size="small" onChange={handleWeek}/>
      </Space>
    );
  }
  if (dataIndex === 'materials')
    inputNode = (
      <Space direction="vertical">
        Link
        <Input defaultValue={record.materials} size="small" />
        Description
        <Input defaultValue={record.description} size="small" />
      </Space>
    );
  if (inputType === 'time') inputNode = <TimePicker defaultValue={moment(getTime(record), 'HH:mm')} size="small" />;
  if (inputType === 'number') inputNode = <InputNumber size="small" />;

  const required = !(dataIndex === 'comments' || dataIndex === 'additional1' || dataIndex === 'additional3');

  return (
    <td {...restProps}>
      {editing && (inputType === 'time' || inputType === 'date') && <Form.Item>{inputNode}</Form.Item>}
      {editing && (inputType === 'text' || inputType === 'number') && (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      )}
      {!editing && children}
    </td>
  );
};

export default EditableCell;
