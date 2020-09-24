import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Button } from 'antd';
import { EditOutlined, CheckSquareOutlined } from '@ant-design/icons';

import { changeEvent } from 'reducers/events';
// import InlineEdit from 'react-edit-inline';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { codewarsSections } from '@constants';

// import axios from 'utils';

import { RootState } from 'store';
import { disableEditMode, enableEditMode } from 'reducers/eventId';
// import { putEventUrl } from '@constants/api';

const Codewars: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const dispatch = useDispatch();
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const isOpen = useSelector((state: RootState) => state.eventId.isOpen);
  const events = useSelector((state: RootState) => state.events.data);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const changed = events.find((event) => event.id === eventId);
  const isEditMode = useSelector(
    (state: RootState) => state.eventId.isEditMode,
  );
  const details = useSelector(
    (state: RootState) => state.events.data[changedInd].details,
  );

  const additionalDetails = {
    taskType: 'codawars',
    taskList: details ? details.taskList : '',
    criteria: details ? details.criteria : '',
    submit: details ? details.submit : '',
    howToCheck: details ? details.howToCheck : '',
    materials: details ? details.materials : '',
  };
  const changedEvent = {
    ...changed,
    details: additionalDetails,
  };

  const updateState = () => {
    console.log(`events: ${events[0].name}`);
    console.log(`changedInd: ${changedInd}`);
    console.log(`changed: ${changed.name}`);
    // console.log(`changedEvent: ${changedEvent}`);
    dispatch(changeEvent({ changedEvent, changedInd }));

    // dispatch
    // axios.put(putEventUrl(id), сам объект)
  };

  const showEditInfo = (info) => {
    let newInfo = '';
    if (details !== undefined) {
      newInfo = details[info];
      console.log(`details taskList: ${details[info]}`);
    } else {
      newInfo = '';
    }
    return <div dangerouslySetInnerHTML={{ __html: newInfo }} />;
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

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
            <Menu.Item key="1">
              <a href="#taskList">Список задач</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="#criteria">Критерии оценки</a>
            </Menu.Item>
            <Menu.Item key="3">
              <a href="#submit">Как сабмитнуть</a>
            </Menu.Item>
            <Menu.Item key="4">
              <a href="#howToCheck">Auto-check</a>
            </Menu.Item>
            <Menu.Item key="5">
              <a href="#materials">Материалы</a>
            </Menu.Item>
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
          {codewarsSections.map((el) => {
            return (
              <>
                <h2 className="task-main-headline" id={el.id}>
                  {el.name}
                </h2>
                {isEditMode ? (
                  <CKEditor
                    editor={ClassicEditor}
                    data={
                      details ? details[el.id] : '<p>Text your task list</p>'
                    }
                    onChange={(event, editor) => {
                      const dataEditor = editor.getData();
                      additionalDetails[el.id] = dataEditor;
                    }}
                  />
                ) : (
                  showEditInfo(el.id)
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Codewars;
