import * as React from 'react';
import { StudyEvent } from 'reducers/events/models';

export const currentDay = new Date().getDate();
export const year = new Date().getFullYear();

export const generateHeader = (
  dateTime: string,
  ref: React.MutableRefObject<HTMLHeadingElement>,
): JSX.Element => {
  const eventDay = Number(dateTime.slice(4, 7));
  const eventMoth = Number(dateTime.slice(8, 10));
  const currentMonth = new Date().getMonth() + 1;
  const eventMs = Date.parse(`${year}-${eventMoth}-${eventDay}`);
  return eventDay === currentDay && eventMoth === currentMonth ? (
    <h4 ref={ref}>{dateTime}</h4>
  ) : (
    <h4>
      <span
        style={{ color: `${eventMs < Date.now() ? 'lightgray' : 'black'}` }}
      >
        {dateTime}
      </span>
    </h4>
  );
};

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
