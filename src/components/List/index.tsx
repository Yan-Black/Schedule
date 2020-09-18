import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { eventTypes } from '@constants';
import {
  generatePanelHader,
  sortDataByDate,
  getKeyByValue,
  currentDay,
} from 'helpers';
import Item from './Item';
import './index.scss';

const List: React.FC = () => {
  const {
    events: { data },
  } = useSelector((state: RootState) => state);
  const { colors } = useSelector((state: RootState) => state);
  const { Panel } = Collapse;
  const dataToApply = data.slice().sort(sortDataByDate);
  const [{ id: defaultKey }] = dataToApply.filter(
    ({ dateTime }) => +dateTime.slice(4, 7) >= currentDay,
  );

  let currentIdx: number;
  dataToApply.forEach((obj) => {
    if (obj.id === defaultKey) {
      currentIdx = dataToApply.indexOf(obj);
    }
  });

  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, ref?.current?.getBoundingClientRect().top);
  }, []);

  return (
    <Collapse defaultActiveKey={[defaultKey]}>
      {dataToApply.map(({ id, dateTime, name, type, eventTime }, i) => (
        <Panel
          header={generatePanelHader(currentIdx, dateTime, i, ref)}
          key={id}
          style={{ opacity: `${i < currentIdx && 0.7}` }}
          className={colors[getKeyByValue(eventTypes, type)] as string}
        >
          <Item name={name} time={eventTime} type={type} eventId={id} />
        </Panel>
      ))}
    </Collapse>
  );
};

export default List;
