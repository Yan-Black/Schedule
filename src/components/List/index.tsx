import * as React from 'react';
import { useEffect, useRef, useMemo } from 'react';
import { Collapse, Skeleton } from 'antd';
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

const { Panel } = Collapse;

const List: React.FC = () => {
  const {
    events: { data },
  } = useSelector((state: RootState) => state);
  const { colors } = useSelector((state: RootState) => state);
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const ref = useRef<HTMLHeadingElement>(null);

  const dataToApply = useMemo(() => [...data].sort(sortDataByDate), [data]);

  let currentIdx: number;
  let defaultKey: string;

  if (!isLoading) {
    const [{ id }] = dataToApply.filter(
      ({ dateTime }) => +dateTime.slice(4, 7) >= currentDay,
    );
    defaultKey = id;

    dataToApply.forEach((obj) => {
      if (obj.id === id) {
        currentIdx = dataToApply.indexOf(obj);
      }
    });
  }

  useEffect(() => {
    window.scrollTo(0, ref?.current?.getBoundingClientRect().top);
  }, [data]);

  return isLoading ? (
    <Skeleton active />
  ) : (
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
