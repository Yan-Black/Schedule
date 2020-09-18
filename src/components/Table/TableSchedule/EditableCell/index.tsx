import * as React from 'react';
import { Input, Form, DatePicker, TimePicker, InputNumber, Space, Select } from 'antd';
import moment from 'moment';
import { EditableCellProps } from '../models';
import { getDate, getTime } from './getOriginData';

const { Option } = Select;

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
  handleTime,
  handleLink,
  handleDescription,
  handleType,
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
        <InputNumber defaultValue={+record.week} min={0} max={50} size="small" onChange={handleWeek} />
      </Space>
    );
  }
  if (dataIndex === 'materials')
    inputNode = (
      <Space direction="vertical">
        Link
        <Input defaultValue={record.materials} size="small" onChange={handleLink} />
        Description
        <Input defaultValue={record.description} size="small" onChange={handleDescription} />
      </Space>
    );
  if (inputType === 'time')
    inputNode = <TimePicker defaultValue={moment(getTime(record), 'HH:mm')} size="small" onChange={handleTime} />;
  if (inputType === 'select')
    inputNode = (
      <Select
        defaultValue={record.type}
        size="small"
        style={{ width: 120 }}
        dropdownMatchSelectWidth={false}
        onChange={handleType}
      >
        <Option value="Online lecture">Online lecture</Option>
        <Option value="Meetup">Meetup</Option>
        <Option value="Task start">Task start</Option>
        <Option value="Task deadline">Task deadline</Option>
        <Option value="Optional task start">Optional task start</Option>
        <Option value="Optional task deadline">Optional task deadline</Option>
        <Option value="Self education">Self education</Option>
        <Option value="Test with grade">Test with grade</Option>
        <Option value="Test without grade">Test without grade</Option>
        <Option value="Cross-check start">Cross-check start</Option>
        <Option value="Cross-check deadline">Cross-check deadline</Option>
        <Option value="Interview start">Interview start</Option>
      </Select>
    );

  const required = !(
    dataIndex === 'comments' ||
    dataIndex === 'additional1' ||
    dataIndex === 'additional3' ||
    dataIndex === 'additional3'
  );

  return (
    <td {...restProps}>
      {editing && (inputType === 'time' || inputType === 'date' || inputType === 'select') && (
        <Form.Item>{inputNode}</Form.Item>
      )}
      {editing && inputType === 'text' && (
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
