import * as React from 'react';
import {
  Input,
  Form,
  TimePicker,
  InputNumber,
  Select,
  Skeleton,
  Divider,
  Spin,
  DatePicker,
} from 'antd';
import { eventTypes } from '@constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { postLector } from 'requests';
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
  windowSize,
  ...restProps
}: EditableCellProps) => {
  const dispatch = useDispatch();
  const [inputLector, setInputLector] = useState('');
  const types = Object.values(eventTypes);
  const organizers = useSelector((state: RootState) => state.organizers.data);
  const { loading } = useSelector((state: RootState) => state.organizers);

  const placeholder = `Add ${title}`;
  let inputNode = <Input.TextArea placeholder={placeholder} />;
  let extraNode: JSX.Element;
  let name = '';
  let extraName = '';
  let label = title;
  let extraLabel = '';

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLector(event.target.value);
  };

  const addLectorHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const newOrganizer = {
      name: inputLector,
    };
    dispatch(postLector(newOrganizer));
    setInputLector('');
  };

  if (inputType === 'date') {
    name = 'date';
    inputNode = <DatePicker format="DD.MM.YYYY" size="small" />;
    extraName = 'week';
    extraLabel = 'Week';
    extraNode = (
      <InputNumber min={0} max={50} size="small" style={{ width: '50px' }} />
    );
  }
  if (dataIndex === 'materials') {
    name = dataIndex;
    extraName = 'description';
    label = 'Link';
    extraLabel = 'Description';
    inputNode = <Input.TextArea placeholder={placeholder} />;
    extraNode = <Input.TextArea placeholder={placeholder} />;
  }
  if (inputType === 'time') {
    name = 'time';
    inputNode = <TimePicker size="small" />;
  }
  if (inputType === 'select' && dataIndex === 'type') {
    name = 'type';
    extraName = 'newLector';
    inputNode = (
      <Select
        size="small"
        dropdownMatchSelectWidth={false}
        placeholder="Select"
      >
        {types.map((type) => (
          <Option value={type} key={type}>
            {type}
          </Option>
        ))}
      </Select>
    );
  }

  if (inputType === 'select' && dataIndex === 'lector') {
    name = 'lector';
    inputNode = (
      <Select
        size="small"
        dropdownMatchSelectWidth={false}
        placeholder="select"
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input
                value={inputLector}
                size="small"
                style={{ flex: 'auto' }}
                placeholder={placeholder}
                onChange={inputChangeHandler}
              />

              <a
                href="/"
                style={{
                  flex: 'none',
                  padding: '8px',
                  display: 'block',
                  cursor: 'pointer',
                }}
                onClick={addLectorHandler}
              >
                <Spin spinning={loading}>
                  <PlusOutlined /> Add
                </Spin>
              </a>
            </div>
          </div>
        )}
      >
        <Option value="no lector" key="no lector" style={{ color: 'red' }}>
          no lector
        </Option>
        {organizers.map((organizer) => (
          <Option value={organizer.name} key={organizer.name}>
            {organizer.name}
          </Option>
        ))}
      </Select>
    );
  }

  const required = !(
    dataIndex === 'comments' ||
    dataIndex === 'place' ||
    dataIndex === 'materials' ||
    (dataIndex === 'lector' && title === 'Lector') ||
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
