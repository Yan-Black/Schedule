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

export const recountDate = (payload: string, obj: StudyEvent): void => {
  let rawHours =
    Number(obj.eventTime.slice(0, 2)) - Number(obj.timeZone) + Number(payload);

  if (rawHours > 23) {
    rawHours -= 24;
    const day = obj.dateTime.slice(4, 7);
    const month = obj.dateTime.slice(8, 10);
    const twentyFourHoursMs = 86400000;
    const mSec = Date.parse(`${year}-${month}-${day}`) + twentyFourHoursMs;
    const date = new Date(mSec);
    const dayToApply =
      new Date(mSec).getDate().toString().length > 1
        ? new Date(mSec).getDate()
        : `0${new Date(mSec).getDate()}`;
    const monthToApply =
      (date.getMonth() + 1).toString().length > 1
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    obj.dateTime = `${date
      .toString()
      .slice(0, 3)}, ${dayToApply}.${monthToApply}.2020`;
  }

  const hoursToApply =
    rawHours.toString().length > 1 ? rawHours.toString() : `0${rawHours}`;
  obj.eventTime = `${hoursToApply}:${obj.eventTime.slice(3)}`;
  obj.timeZone = payload;
};
