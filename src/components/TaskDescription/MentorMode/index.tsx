/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './index.scss';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Button, Checkbox, Card, Input } from 'antd';
import { EditOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { changeEvent } from 'reducers/events';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  codewarsSections,
  coreJsSections,
  interviewSections,
  meetupSections,
  standartTaskSections,
} from '@constants';
import { RootState } from 'store';
import { disableEditMode, enableEditMode } from 'reducers/eventId';
import { TaskTypes } from 'reducers/events/models';
import { TaskSections, TaskSection } from '../models';
import TaskSelector from '../TaskSelector';
import TaskMainInfo from './TaskMainInfo';

const { Search } = Input;
// import { putEventUrl } from '@constants/api';

const MentorMode: React.FC = () => {
  const [isEnable, toggleAddReview] = useState(true);
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const dispatch = useDispatch();
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const events = useSelector((state: RootState) => state.events.data);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const changed = events.find((event) => event.id === eventId);
  const isEditMode = useSelector(
    (state: RootState) => state.eventId.isEditMode,
  );
  const feedbacks = events[changedInd].feedBack
    ? events[changedInd].feedBack.comments
    : [];
  const details: TaskTypes = useSelector(
    (state: RootState) => state.events.data[changedInd].details,
  );
  let sections: TaskSections = [];
  const isTaskStart =
    events[changedInd].type === 'Task start' ||
    events[changedInd].type === 'Optional task start';
  const isTaskWithSections =
    events[changedInd].type === 'Meetup' ||
    events[changedInd].type === 'Interview start' ||
    events[changedInd].type === 'Task start' ||
    events[changedInd].type === 'Optional task start';

  const additionalDetails = {
    taskType: details ? details.taskType : '',
    taskList: details ? details.taskList : '',
    criteria: details ? details.criteria : '',
    submit: details ? details.submit : '',
    howToCheck: details ? details.howToCheck : '',
    materials: details ? details.materials : '',
  };

  const comments = {
    comments: [...feedbacks],
    isEnableAddReview: isEnable,
  };

  let newAddress = events[changedInd].address ? events[changedInd].address : '';

  const changedEvent = {
    ...changed,
    address: 'test',
    details: additionalDetails,
    feedBack: comments,
  };

  const updateState = () => {
    // console.log('1');
    dispatch(changeEvent({ changedEvent, changedInd }));
    // dispatch
    // axios.put(putEventUrl(id), сам объект)
  };

  const checkSubDetails = () => {
    switch (details ? details.taskType : '') {
      case 'codewars':
        sections = codewarsSections;
        break;
      case 'coreJS':
        sections = coreJsSections;
        break;
      case 'standartTask':
        sections = standartTaskSections;
        break;
      default:
        sections = [];
    }
  };

  switch (events[changedInd].type) {
    case 'Meetup':
      sections = meetupSections;
      break;
    case 'Interview start':
      sections = interviewSections;
      break;
    default:
      checkSubDetails();
  }

  const showEditInfo = (info: string) => {
    console.log('showeditinfo');
    let newInfo: string;
    if (details !== undefined) {
      newInfo = details[info];
    } else {
      newInfo = '';
    }
    return (
      // eslint-disable-next-line react/no-danger
      <div dangerouslySetInnerHTML={{ __html: newInfo }} />
    );
  };

  const searchAddress = (value) => {
    console.log(value);
    newAddress = value;
    dispatch(changeEvent({ changedEvent, changedInd }));
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  const onChangeEnableAddReviews = () => {
    toggleAddReview(!isEnable);
  };

  return (
    <>
      <div className="task-desc-container">
        <div className="task-desc-nav">
          {isTaskWithSections ? (
            <Menu
              style={{ width: 256 }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              {sections.map((el, index) => {
                return (
                  <Menu.Item
                    key={changedInd.toString().concat(index.toString())}
                  >
                    <a href={'#'.concat(el.id)}>{el.name}</a>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : (
            ''
          )}
        </div>
        <div className="task-desc-area">
          <TaskMainInfo />
          {isTaskStart ? <TaskSelector /> : ''}
          <Card
            size="small"
            title="Additional information"
            style={{ width: '100%' }}
            className="short-info"
            extra={
              <Button
                type="dashed"
                icon={<EditOutlined />}
                onClick={() => {
                  dispatch(enableEditMode());
                }}
              >
                Edit
              </Button>
            }
          >
            {isTaskWithSections ? (
              <React.Fragment key={changedInd.toString()}>
                {sections
                  .filter((el) => el.id !== 'place')
                  .map((el: TaskSection, index) => {
                    return (
                      <React.Fragment
                        key={changedInd.toString().concat(index.toString())}
                      >
                        <div>
                          <h2
                            className="task-main-headline"
                            id={el.id}
                            key={changedInd.toString().concat(index.toString())}
                          >
                            {el.name}
                          </h2>

                          {isEditMode ? (
                            <CKEditor
                              editor={ClassicEditor}
                              data={
                                details
                                  ? details[el.id]
                                  : '<p>Text your task list</p>'
                              }
                              onChange={(event, editor) => {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                const dataEditor: string = editor.getData();
                                additionalDetails[el.id] = dataEditor;
                              }}
                            />
                          ) : (
                            showEditInfo(el.id)
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                {sections
                  .filter((el) => el.id === 'place')
                  .map((el, index) => {
                    return (
                      <React.Fragment
                        key={changedInd.toString().concat(index.toString())}
                      >
                        <h2 className="task-main-headline">Место встречи</h2>
                        {isEditMode ? (
                          <Search
                            placeholder="Input address"
                            onSearch={searchAddress}
                            style={{ width: 200 }}
                          />
                        ) : (
                          ''
                        )}
                      </React.Fragment>
                    );
                  })}
              </React.Fragment>
            ) : (
              ''
            )}
            {isEditMode ? (
              <Checkbox
                className="toggle-add-review"
                onChange={onChangeEnableAddReviews}
              >
                Enable adding reviews
              </Checkbox>
            ) : (
              <Checkbox disabled defaultChecked={isEnable}>
                Enable adding reviews
              </Checkbox>
            )}
            <div className="save-btn">
              <Button
                type="dashed"
                icon={<CheckSquareOutlined />}
                style={{ color: 'green' }}
                onClick={() => {
                  dispatch(disableEditMode());
                  updateState();
                }}
              >
                Save
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MentorMode;
