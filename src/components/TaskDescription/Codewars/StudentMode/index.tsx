import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Button } from 'antd';
import { EditOutlined, CheckSquareOutlined } from '@ant-design/icons';

import { changeEvent } from 'reducers/events';
// import InlineEdit from 'react-edit-inline';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    taskList: 'something',
    criteria: 'some criteria',
    submit: 'how to submit',
    howToCheck: 'what should I do',
    materials: 'what to read',
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

  const showTasksList = () => {
    let taskList = '';
    if (details !== undefined) {
      taskList = details.taskList;
      console.log(`details taskList: ${details.taskList}`);
    } else {
      taskList = '';
    }
    return <div dangerouslySetInnerHTML={{ __html: taskList }} />;
  };

  const editorConfiguration = {};

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div>StudentMode</div>
      {/* <div className="task-desc-container">
        <div className="task-desc-nav">
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <Menu.Item key="1">
              <a href="#task-list">Список задач</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="#criteria">Критерии оценки</a>
            </Menu.Item>
            <Menu.Item key="3">
              <a href="#submit">Как сабмитнуть</a>
            </Menu.Item>
            <Menu.Item key="4">
              <a href="#auto-check">Auto-check</a>
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
              }}
            >
              Save
            </Button>
          </div>
          <h2 className="task-main-headline" id="task-list">
            Список задач
          </h2>
          {isEditMode ? (
            <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor 5!</p>"
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              config={editorConfiguration}
              onChange={(event, editor) => {
                const dataEditor = editor.getData();
                console.log({ event, editor, dataEditor });
                additionalDetails.taskList = dataEditor;
                updateState();
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          ) : (
            showTasksList()
          )}
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h2 className="task-main-headline" id="criteria">
            Критерии оценки
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h2 className="task-main-headline" id="submit">
            Как сабмитнуть
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h2 className="task-main-headline" id="auto-check">
            Auto-check
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h2 className="task-main-headline" id="materials">
            Материалы
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
        </div>
      </div> */}
    </>
  );
};

export default Codewars;
