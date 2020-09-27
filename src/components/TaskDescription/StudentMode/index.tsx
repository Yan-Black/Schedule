import './index.scss';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Menu, Card, Avatar, Rate } from 'antd';
import {
  codewarsSections,
  coreJsSections,
  interviewSections,
  meetupSections,
  columns,
} from '@constants';
import { RootState } from 'store';
import { TaskTypes } from 'reducers/events/models';
import { TaskSections } from '../models';
import Rating from './Rating';

const { Meta } = Card;

const StudentMode: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const events = useSelector((state: RootState) => state.events.data);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const details: TaskTypes = useSelector(
    (state: RootState) => state.events.data[changedInd].details,
  );
  const feedbacks = events[changedInd].feedBack
    ? events[changedInd].feedBack.comments
    : [];
  let sections: TaskSections = [];
  const isAddReview = events[changedInd].feedBack
    ? events[changedInd].feedBack.isEnableAddReview
    : true;

  if (isLoading) {
    return <p>loading...</p>;
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

  switch (details ? details.taskType : '') {
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

  return (
    <React.Fragment key={changedInd.toString()}>
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
          <div className="main-task-info">
            <Card
              size="small"
              title="Краткая информация"
              style={{ width: 300 }}
              className="short-info"
            >
              {Object.values(columns).map((el, index) => {
                return (
                  <h4 key={changedInd.toString().concat(index.toString())}>
                    {el}:
                    <span>
                      {events[changedInd][Object.keys(columns)[index]]}
                    </span>
                  </h4>
                );
              })}
            </Card>
            {isAddReview ? <Rating /> : ''}
          </div>
          {sections.map((el, index) => {
            return (
              <React.Fragment
                key={changedInd.toString().concat(index.toString())}
              >
                <h2 className="task-main-headline" id={el.id}>
                  {el.name}
                </h2>
                {showEditInfo(el.id)}
              </React.Fragment>
            );
          })}
          {isAddReview ? (
            <React.Fragment key={changedInd.toString()}>
              <h2 className="task-main-headline">Рейтинг</h2>
              {feedbacks.map((el, index) => {
                return (
                  <React.Fragment
                    key={changedInd.toString().concat(index.toString())}
                  >
                    <Rate
                      className="user-stars"
                      disabled
                      defaultValue={el.raiting}
                    />
                    <Meta
                      className="user-rating"
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={el.author}
                      description={el.text}
                    />
                    <hr className="rate-line" />
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ) : (
            ''
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StudentMode;
