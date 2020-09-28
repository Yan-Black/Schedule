import * as React from 'react';
import { useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Skeleton, Timeline, Card } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { generateHeader, sortDataByDate, setFont } from 'helpers';
import { StudyEvent } from 'reducers/events/models';
import { ArrowUpOutlined } from '@ant-design/icons';
import ListRow from './ListRow';
import './index.scss';

const List: React.FC = () => {
  const {
    events: { data },
  } = useSelector((state: RootState) => state);
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const ref = useRef<HTMLHeadingElement>(null);
  const currentVisual = useSelector(
    (state: RootState) => state.settings.visual,
  );
  const font = setFont(currentVisual);

  const groupedEvents = useMemo(() => {
    return Object.entries(
      [...data]
        .sort(sortDataByDate)
        .reduce((wrap: { [x: string]: StudyEvent[] }, obj) => {
          wrap[obj.dateTime] ||= [];
          wrap[obj.dateTime].push(obj);
          return wrap;
        }, {}),
    );
  }, [data]);

  const [active, setActive] = useState(false);

  const clickHandler = () => {
    window.scrollTo(0, 0);
  };

  const scrollHandler = () => {
    if (
      window.pageYOffset >=
      ref?.current?.getBoundingClientRect().top + window.pageYOffset / 2
    ) {
      setActive(true);
    } else if (
      window.pageYOffset <=
      ref?.current?.getBoundingClientRect().top + window.pageYOffset / 2
    ) {
      setActive(false);
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, ref?.current?.getBoundingClientRect().top);
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [data]);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <Timeline>
      {groupedEvents.map(([dateTime, info]) => (
        <Card
          title={generateHeader(data, dateTime, ref)}
          key={dateTime}
          style={font}
        >
          {info.map(({ description, id, type, eventTime, name }) => (
            <ListRow
              key={id}
              eventId={id}
              desc={description}
              time={eventTime}
              type={type}
              name={name}
            />
          ))}
        </Card>
      ))}
      <button
        type="button"
        className={
          active
            ? 'list__button up_button'
            : 'list__button up_button button_disabled'
        }
        onClick={clickHandler}
      >
        <ArrowUpOutlined />
      </button>
    </Timeline>
  );
};

export default List;
