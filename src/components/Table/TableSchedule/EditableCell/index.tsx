import * as React from 'react';
import { Input, Form, DatePicker, TimePicker, InputNumber, Select } from 'antd';
import moment, { Moment } from 'moment';
import { eventTypes } from '@constants';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
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
  handleLector,
  ...restProps
}: EditableCellProps) => {
  const types = Object.values(eventTypes);
  const organizers = useSelector((state: RootState) => state.organizers.data);
  const lectorData =
    record === undefined
      ? []
      : organizers.filter((organizer) => organizer.id === record.lector);
  const lector = lectorData.length > 0 ? lectorData[0].name : null;
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
    name = dataIndex === 'type' ? 'type' : 'lector';
    initialValue = dataIndex === 'type' ? record.type : lector;
    inputNode = (
      <Select
        size="small"
        style={{ width: 120 }}
        dropdownMatchSelectWidth={false}
        onChange={dataIndex === 'type' ? handleType : handleLector}
      >
        {dataIndex === 'type'
          ? types.map((type) => (
              <Option value={type} key={type}>
                {type}
              </Option>
            ))
          : organizers.map((organizer) => (
              <Option value={organizer.name} key={organizer.id}>
                {organizer.name}
              </Option>
            ))}
        {dataIndex === 'lector' && (
          <Option
            value="no lector"
            key="noLector"
            style={{ background: '#f2d0d0d9' }}
          >
            delete lector
          </Option>
        )}
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
    // eslint-disable-next-line react/jsx-props-no-spreading
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
