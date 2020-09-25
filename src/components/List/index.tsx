import * as React from 'react';
import { useEffect, useRef, useMemo } from 'react';
import { Skeleton, Timeline, Card } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { generateHeader, sortDataByDate, setFont } from 'helpers';
import { StudyEvent } from 'reducers/events/models';
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

  useEffect(() => {
    window.scrollTo(0, ref?.current?.getBoundingClientRect().top);
  }, [data]);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <Timeline>
      {groupedEvents.map(([dateTime, info]) => (
        <Card title={generateHeader(dateTime, ref)} key={dateTime} style={font}>
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
    </Timeline>
  );
};

export default List;
