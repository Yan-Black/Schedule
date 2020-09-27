import * as React from 'react';
import { StudyEvent } from 'reducers/events/models';

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

export const generateHeader = (
  events: StudyEvent[],
  dateTime: string,
  ref: React.MutableRefObject<HTMLHeadingElement>,
): JSX.Element => {
  const eventDay = (dateTime: string): number => Number(dateTime.slice(4, 7));
  const eventMoth = (dateTime: string): number => Number(dateTime.slice(8, 10));
  const currentMonth = new Date().getMonth() + 1;
  const eventMs = Date.parse(
    `${year}-${eventMoth(dateTime)}-${eventDay(dateTime)}`,
  );
  const [{ dateTime: closestDate }] = events
    .filter((obj) => {
      return (
        eventDay(obj.dateTime) >= currentDay &&
        eventMoth(obj.dateTime) >= currentMonth
      );
    })
    .sort(sortDataByDate);

  return closestDate === dateTime ? (
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

export const getKeyByValue = (
  obj: { [x: string]: string },
  value: string,
): string => Object.keys(obj).find((key) => obj[key] === value);

const recount = (
  obj: StudyEvent,
  month: string,
  day: string,
  twentyFourHoursMs: number,
): void => {
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
    .slice(0, 3)}, ${dayToApply}.${monthToApply}.${year}`;
};

export const recountDate = (payload: string, obj: StudyEvent): void => {
  let rawHours =
    Number(obj.eventTime.slice(0, 2)) - Number(obj.timeZone) + Number(payload);
  const day = obj.dateTime.slice(4, 7);
  const month = obj.dateTime.slice(8, 10);
  const twentyFourHoursMs = 86400000;

  if (rawHours > 23) {
    rawHours -= 24;
    recount(obj, month, day, twentyFourHoursMs);
  } else if (rawHours < 0) {
    rawHours += 24;
    recount(obj, month, day, -twentyFourHoursMs);
  }

  const hoursToApply =
    rawHours.toString().length > 1 ? rawHours.toString() : `0${rawHours}`;
  obj.eventTime = `${hoursToApply}:${obj.eventTime.slice(3)}`;
  obj.timeZone = payload;
};

export const setFont: (value: boolean) => { fontSize: string } = (
  value: boolean,
) => (value ? { fontSize: '16px' } : { fontSize: '12px' });
