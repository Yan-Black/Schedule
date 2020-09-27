/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './index.scss';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Button, Checkbox } from 'antd';
import { EditOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { changeEvent } from 'reducers/events';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  codewarsSections,
  coreJsSections,
  interviewSections,
  meetupSections,
} from '@constants';
import { RootState } from 'store';
import { disableEditMode, enableEditMode } from 'reducers/eventId';
import { TaskTypes } from 'reducers/events/models';
import { TaskSections, TaskSection } from '../models';

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
  const feedbacks = events[changedInd].feedBack.comments;
  const details: TaskTypes = useSelector(
    (state: RootState) => state.events.data[changedInd].details,
  );
  let sections: TaskSections = [];
  let newEnableAddReview: boolean;

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

  const changedEvent = {
    ...changed,
    details: additionalDetails,
    feedBack: comments,
  };

  const updateState = () => {
    dispatch(changeEvent({ changedEvent, changedInd }));
    // dispatch
    // axios.put(putEventUrl(id), сам объект)
  };

  switch (details.taskType) {
    case 'codewars':
      sections = codewarsSections;
      break;
    case 'coreJS':
      sections = coreJsSections;
      break;
    case 'interview':
      sections = interviewSections;
      break;
    case 'meetup':
      sections = meetupSections;
      break;
    default:
      sections = codewarsSections;
  }

  const showEditInfo = (info: string) => {
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
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            {sections.map((el, index) => {
              return (
                <Menu.Item key={changedInd.toString().concat(index.toString())}>
                  <a href={'#'.concat(el.id)}>{el.name}</a>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
        <div className="task-desc-area">
          <div className="edit-buttons">
            <Button
              type="dashed"
              icon={<EditOutlined />}
              style={{ marginRight: '10px' }}
              onClick={() => {
                dispatch(enableEditMode());
              }}
            >
              Edit
            </Button>
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
          {sections.map((el: TaskSection, index) => {
            return (
              <>
                <div key={changedInd.toString().concat(index.toString())}>
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
                        details ? details[el.id] : '<p>Text your task list</p>'
                      }
                      onChange={(event, editor) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        const dataEditor: string = editor.getData();
                        additionalDetails[el.id] = dataEditor;
                      }}
                      key={changedInd.toString().concat(index.toString())}
                    />
                  ) : (
                    showEditInfo(el.id)
                  )}
                </div>
              </>
            );
          })}
          {isEditMode ? (
            <Checkbox className="toggle-add-review" onChange={onChangeEnableAddReviews}>Enable adding reviews</Checkbox>
          ) : (
            <Checkbox disabled defaultChecked={isEnable}>Enable adding reviews</Checkbox>
          )}
        </div>
      </div>
    </>
  );
};

export default MentorMode;
