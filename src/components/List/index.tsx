import * as React from 'react';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { sortDataByDate, currentDay } from 'constants/index';
import Item from './Item';
import './index.scss';

const List: React.FC = () => {
  const {
    events: { data },
  } = useSelector((state: RootState) => state);

  const { Panel } = Collapse;

  const dataToApply = data.slice().sort(sortDataByDate);

  const [{ id: defaultKey }] = dataToApply.filter(
    ({ dateTime }) => +dateTime.slice(4, 7) >= currentDay,
  );

  return (
    <Collapse defaultActiveKey={[defaultKey]}>
      {dataToApply.map(({ id, dateTime, name, type, eventTime }) => (
        <Panel header={dateTime} key={id}>
          <Item name={name} time={eventTime} type={type} eventId={id} />
        </Panel>
      ))}
    </Collapse>
  );
};

export default List;
