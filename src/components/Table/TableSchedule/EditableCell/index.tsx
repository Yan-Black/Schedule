import * as React from 'react';
import { Input, Form, DatePicker, TimePicker, InputNumber, Select } from 'antd';
import moment, { Moment } from 'moment';
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
  let inputNode = <Input.TextArea />;
  let extraNode: JSX.Element;
  let name = '';
  let extraName = '';
  let initialValue: Moment | string;
  let extraValue: number | string;
  let label = title;
  let extraLabel = '';
  if (inputType === 'date') {
    name = 'date';
    initialValue = moment(getDate(record), 'DD:MM:YYYY');
    label = 'Date';
    inputNode = (
      <DatePicker format="DD.MM.YYYY" size="small" onChange={handleDate} />
    );
    extraName = 'Week';
    extraValue = +record.week;
    extraLabel = 'Week';
    extraNode = (
      <InputNumber
        value={+record.week}
        min={0}
        max={50}
        size="small"
        onChange={handleWeek}
      />
    );
  }
  if (dataIndex === 'materials') {
    name = 'Materials';
    initialValue = record.materials;
    extraName = 'Link';
    extraValue = record.description;
    label = 'Link';
    extraLabel = 'Description';
    inputNode = <Input.TextArea onChange={handleLink} />;
    extraNode = <Input.TextArea onChange={handleDescription} />;
  }
  if (inputType === 'time') {
    name = 'time';
    label = 'Time';
    initialValue = moment(getTime(record), 'HH:mm');
    inputNode = <TimePicker size="small" onChange={handleTime} />;
  }
  if (inputType === 'select') {
    name = 'type';
    initialValue = record.type;
    inputNode = (
      <Select
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
  }

  const required = !(
    dataIndex === 'comments' ||
    dataIndex === 'place' ||
    dataIndex === 'materials' ||
    dataIndex === 'lector' ||
    dataIndex === 'additional1' ||
    dataIndex === 'additional2' ||
    dataIndex === 'additional3'
  );

  return (
    <td {...restProps}>
      {editing && (
        <Form.Item
          name={name === '' ? dataIndex : name}
          style={{ margin: 0 }}
          initialValue={initialValue}
          label={label === '' ? null : label}
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
      {editing && extraNode && (
        <Form.Item
          name={extraName}
          style={{ margin: 0 }}
          initialValue={extraValue}
          label={extraLabel === '' ? null : extraLabel}
          rules={[
            {
              required,
              message: `Please Input ${extraName}!`,
            },
          ]}
        >
          {extraNode}
        </Form.Item>
      )}
    </td>
  );
};

export default EditableCell;
