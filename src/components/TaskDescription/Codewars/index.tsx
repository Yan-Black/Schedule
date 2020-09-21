import './index.scss';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
// import InlineEdit from 'react-edit-inline';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import axios from 'utils';
// import { changeEvent } from 'reducers/events';

import { RootState } from 'store';
// import { putEventUrl } from '@constants/api';

const Codewars: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const message = 'Test';
  const updateState = () => {
    // dispatch
    // axios.put(putEventUrl(id), сам объект)
  };
  const editorConfiguration = {};

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
          <h2 className="task-main-headline" id="task-list">
            Список задач
          </h2>
          <p>{message}</p>
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            config={editorConfiguration}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
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
      </div>
    </>
  );
};

export default Codewars;
