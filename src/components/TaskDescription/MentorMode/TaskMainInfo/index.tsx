import * as React from 'react';
import { useSelector } from 'react-redux';
import { columns } from '@constants';
import { RootState } from 'store';
import {
  Form,
  Card,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';

const TaskMainInfo: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.data);
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const isEditMode = useSelector(
    (state: RootState) => state.eventId.isEditMode,
  );

  const showEditInfo = () => {
    return (
      <React.Fragment key={changedInd.toString()}>
        {Object.values(columns).map((el, index) => {
          return (
            <React.Fragment
              key={changedInd.toString().concat(index.toString())}
            >
              {events[changedInd][Object.keys(columns)[index]] ? (
                <h4 key={changedInd.toString().concat(index.toString())}>
                  <span className="main-info-header">{el}: </span>
                  <span>{events[changedInd][Object.keys(columns)[index]]}</span>
                </h4>
              ) : (
                ''
              )}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <Card
      size="small"
      title="Main information"
      style={{ width: 300 }}
      className="short-info"
    >
      {isEditMode ? (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Input">
            <Input />
          </Form.Item>
          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>
          <Form.Item label="InputNumber">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Switch">
            <Switch />
          </Form.Item>
          <Form.Item label="Button">
            <Button>Button</Button>
          </Form.Item>
        </Form>
      ) : (
        showEditInfo()
      )}
    </Card>
  );
};

export default TaskMainInfo;
