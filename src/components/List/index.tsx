import * as React from 'react';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import Item from './Item';
import './index.scss';

const List: React.FC = () => {
  const {
    events: { data },
  } = useSelector((state: RootState) => state);

  const { Panel } = Collapse;

  const currentDay = new Date().getDate();
  const [{ id: defaultKey }] = data
    .filter(({ dateTime }) => +dateTime.slice(4, 7) >= currentDay)
    .sort((a, b) =>
      b.dateTime.slice(4, 7) < a.dateTime.slice(4, 7) &&
      b.dateTime.slice(8, 10) <= a.dateTime.slice(8, 10)
        ? 1
        : -1,
    );

  return (
    <Collapse defaultActiveKey={[defaultKey]}>
      {data
        .slice()
        .sort((a, b) =>
          b.dateTime.slice(4, 7) < a.dateTime.slice(4, 7) &&
          b.dateTime.slice(8, 10) <= a.dateTime.slice(8, 10)
            ? 1
            : -1,
        )
        .map(({ id, dateTime, name, type, eventTime }) => (
          <Panel header={dateTime} key={id}>
            <Item name={name} time={eventTime} type={type} eventId={id} />
          </Panel>
        ))}
    </Collapse>
  );
};

export default List;
