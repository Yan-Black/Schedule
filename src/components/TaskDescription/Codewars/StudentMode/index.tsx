import * as React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
import { codewarsSections } from '@constants';
import { RootState } from 'store';

const StudentMode: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const events = useSelector((state: RootState) => state.events.data);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const details = useSelector(
    (state: RootState) => state.events.data[changedInd].details,
  );

  const showEditInfo = (info) => {
    let newInfo = '';
    if (details !== undefined) {
      newInfo = details[info];
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
            {codewarsSections.map((el) => {
              return (
                <Menu.Item key={el.id}>
                  <a href={'#'.concat(el.id)}>{el.name}</a>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
        <div className="task-desc-area">
          {codewarsSections.map((el) => {
            return (
              <>
                <h2 className="task-main-headline" id={el.id}>
                  {el.name}
                </h2>
                {showEditInfo(el.id)}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StudentMode;
