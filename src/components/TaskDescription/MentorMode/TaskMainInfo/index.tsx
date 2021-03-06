/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import axios from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import { columns, eventTypes } from '@constants';
import { RootState } from 'store';
import {
  Form,
  Card,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
  InputNumber,
} from 'antd';
import moment from 'moment';
import { changeEvent } from 'reducers/events';
import { EditOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { putEventUrl } from '@constants/api';

const TaskMainInfo: React.FC = () => {
  const [isEditMode, toggleEditMode] = useState(false);
  const events = useSelector((state: RootState) => state.events.data);
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const organizers = useSelector((state: RootState) => state.organizers.data);
  const changedOrganizerInd = organizers.findIndex(
    (person) => person.id === events[changedInd].organizerId,
  );
  const changed = events.find((event) => event.id === eventId);
  const dispatch = useDispatch();

  const dateFormat = 'DD.MM.YYYY';
  const timeFormat = 'HH:mm';

  const showEditMainInfo = () => {
    return (
      <React.Fragment key={changedInd.toString()}>
        {Object.values(columns).map((el, index) => {
          if (el === 'Description') {
            return (
              <h4 key={changedInd.toString().concat(index.toString())}>
                <span className="main-info-header">Materials: </span>
                <span>
                  <a href={events[changedInd].descriptionUrl}>
                    {events[changedInd].description}
                  </a>
                </span>
              </h4>
            );
          }
          if (el === 'Lector' && events[changedInd].organizerId) {
            return (
              <h4 key={changedInd.toString().concat(index.toString())}>
                <span className="main-info-header">Lector: </span>
                <span>{organizers[changedOrganizerInd].name}</span>
              </h4>
            );
          }
          return (
            <React.Fragment
              key={changedInd.toString().concat(index.toString())}
            >
              {events[changedInd][Object.keys(columns)[index]] && (
                <h4 key={changedInd.toString().concat(index.toString())}>
                  <span className="main-info-header">{el}: </span>
                  <span>{events[changedInd][Object.keys(columns)[index]]}</span>
                </h4>
              )}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

  const changedEvent = {
    ...changed,
    name: events[changedInd].name,
    place: events[changedInd].place,
    organizerId: events[changedInd].organizerId,
    comment: events[changedInd].comment,
    dateTime: events[changedInd].dateTime,
    week: events[changedInd].week.toString(),
    eventTime: events[changedInd].eventTime,
    description: events[changedInd].description,
    descriptionUrl: events[changedInd].descriptionUrl,
    type: events[changedInd].type,
  };

  const saveMainInfo = async (value) => {
    const newOrganizerInd = organizers.findIndex(
      (person) => person.name === value.lector,
    );
    console.log(`newOrganizerInd: ${newOrganizerInd}`);
    toggleEditMode(false);
    changedEvent.name = value.name;
    changedEvent.place = value.place;
    changedEvent.week = value.week;
    changedEvent.type = value.type;
    changedEvent.organizerId = organizers[newOrganizerInd].id;
    changedEvent.comment = value.comment;
    changedEvent.description = value.description;
    changedEvent.descriptionUrl = value.descriptionUrl;

    const time: Date = value.time.toDate();
    const hours: string =
      time.getHours().toString().length < 2
        ? `0${time.getHours()}`
        : time.getHours().toString();
    const minutes: string =
      time.getMinutes().toString().length < 2
        ? `0${time.getMinutes()}`
        : time.getMinutes().toString();
    changedEvent.eventTime = `${hours}:${minutes}`;

    const date: Date = value.date.toDate();
    const dateDate =
      date.getDate().toString().length < 2
        ? `0${date.getDate()}`
        : date.getDate().toString();
    const dateMonth =
      (date.getMonth() + 1).toString().length < 2
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const dateYear = date.getFullYear();
    const dayOfWeek: string = value.date.toDate().toString().slice(0, 3);
    changedEvent.dateTime = `${dayOfWeek}, ${dateDate}.${dateMonth}.${dateYear}`;

    console.log(value);

    await axios.put(putEventUrl(events[changedInd].id), changedEvent);
    dispatch(changeEvent({ changedEvent, changedInd }));
  };

  return (
    <Card
      size="small"
      title="Main information"
      style={{ width: '100%' }}
      className="short-info"
      extra={
        <Button
          type="dashed"
          icon={<EditOutlined />}
          onClick={() => {
            toggleEditMode(true);
          }}
        >
          Edit
        </Button>
      }
    >
      {isEditMode ? (
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{
            date: moment(events[changedInd].dateTime, dateFormat),
            time: moment(events[changedInd].eventTime, timeFormat),
            week: events[changedInd].week,
            name: events[changedInd].name,
            type: events[changedInd].type,
            lector: events[changedInd].organizerId
              ? organizers[changedOrganizerInd].name
              : '',
            place: events[changedInd].place,
            comment: events[changedInd].comment,
            description: events[changedInd].description,
            descriptionUrl: events[changedInd].descriptionUrl,
          }}
          onFinish={saveMainInfo}
        >
          <Form.Item label="Date" name="date">
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item label="Time" name="time">
            <TimePicker style={{ width: '100%' }} format={timeFormat} />
          </Form.Item>
          <Form.Item label="Week" name="week">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              {Object.values(eventTypes).map((el, index) => {
                return (
                  <Select.Option
                    key={changedInd.toString().concat(index.toString())}
                    value={el}
                  >
                    {el}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Lector" name="lector">
            <Select>
              {organizers
                .filter((el) => el.name)
                .map((el) => {
                  return (
                    <Select.Option key={el.id} value={el.name}>
                      {el.name}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Place" name="place">
            <Input placeholder="If meetup look map in additional info" />
          </Form.Item>
          <Form.Item label="Comment" name="comment">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Description for URL below" />
          </Form.Item>
          <Form.Item label="Link" name="descriptionUrl">
            <Input.TextArea placeholder="URL field for description above" />
          </Form.Item>
          <Form.Item>
            <Button
              type="dashed"
              icon={<CheckSquareOutlined />}
              style={{ color: 'green', float: 'right' }}
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : (
        showEditMainInfo()
      )}
    </Card>
  );
};

export default TaskMainInfo;
