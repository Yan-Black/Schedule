import * as React from 'react';
import { StudyEvent } from 'reducers/events/models';

export const generatePanelHader = (
  currentIdx: number,
  dateTime: string,
  i: number,
  ref: React.MutableRefObject<HTMLHeadingElement>,
): JSX.Element =>
  currentIdx === i ? (
    <h4
      style={{ color: `${currentIdx > i ? 'lightgray' : 'black'}` }}
      ref={ref}
    >
      {dateTime}
    </h4>
  ) : (
    <h4 style={{ color: `${currentIdx > i ? 'lightgray' : 'black'}` }}>
      {dateTime}
    </h4>
  );

export const currentDay = new Date().getDate();
export const year = new Date().getFullYear();

export const sortDataByDate = (
  prevObject: StudyEvent,
  nextObj: StudyEvent,
): number => {
  const prevDay = prevObject.dateTime.slice(4, 7);
  const nextDay = nextObj.dateTime.slice(4, 7);
  const prevMonth = prevObject.dateTime.slice(8, 10);
  const nextMonth = nextObj.dateTime.slice(8, 10);
  return new Date(year, +nextMonth, +nextDay) <
    new Date(year, +prevMonth, +prevDay)
    ? 1
    : -1;
};

export const getKeyByValue = (
  obj: { [x: string]: string },
  value: string,
): string => Object.keys(obj).find((key) => obj[key] === value);

export const setFont: (value: boolean) => { fontSize: string } = (
  value: boolean,
) => {
  return value ? { fontSize: '16px' } : { fontSize: '12px' };
};
