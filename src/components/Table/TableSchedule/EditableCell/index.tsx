import * as React from 'react';
import {
  Input,
  Form,
  DatePicker,
  TimePicker,
  InputNumber,
  Select,
  Skeleton,
} from 'antd';
import { eventTypes } from '@constants';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { EditableCellProps } from '../models';

const { Option } = Select;

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  isLoad,
  ...restProps
}: EditableCellProps) => {
  const types = Object.values(eventTypes);
  const organizers = useSelector((state: RootState) => state.organizers.data);
  let inputNode = <Input.TextArea />;
  let extraNode: JSX.Element;
  let name = '';
  let extraName = '';
  let label = title;
  let extraLabel = '';
  if (inputType === 'date') {
    name = 'date';
    label = 'Date';
    inputNode = <DatePicker format="DD.MM.YYYY" size="small" />;
    extraName = 'week';
    extraLabel = 'Week';
    extraNode = <InputNumber min={0} max={50} size="small" />;
  }
  if (dataIndex === 'materials') {
    name = 'materials';
    extraName = 'description';
    label = 'Link';
    extraLabel = 'Description';
    inputNode = <Input.TextArea />;
    extraNode = <Input.TextArea />;
  }
  if (inputType === 'time') {
    name = 'time';
    label = 'Time';
    inputNode = <TimePicker size="small" />;
  }
  if (inputType === 'select') {
    name = dataIndex === 'type' ? 'type' : 'lector';
    inputNode = (
      <Select
        size="small"
        style={{ width: 120 }}
        dropdownMatchSelectWidth={false}
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
    <td {...restProps}>
      {editing &&
        (isLoad ? (
          <Skeleton active paragraph={{ rows: 0 }} />
        ) : (
          <Form.Item
            name={name === '' ? dataIndex : name}
            style={{ margin: 0 }}
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
        ))}
      {!editing && children}
      {editing && extraNode && !isLoad && (
        <Form.Item
          name={extraName}
          style={{ margin: 0 }}
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
