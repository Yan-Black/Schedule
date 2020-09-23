import { ScheduleData } from '../models';

const sortEvents = (
  prevEvent: ScheduleData,
  nextEvent: ScheduleData,
): number => {
  const prevDate = prevEvent.startDay.split(' ')[1].split('.');
  const nextDate = nextEvent.startDay.split(' ')[1].split('.');

  const prevDay = prevDate[0];
  const prevMonth = prevDate[1];
  const prevYear = prevDate[2];
  const nextDay = nextDate[0];
  const nextMonth = nextDate[1];
  const nextYear = nextDate[2];

  return new Date(+prevYear, +prevMonth, +prevDay) >
    new Date(+nextYear, +nextMonth, +nextDay)
    ? 1
    : -1;
};

export default sortEvents;
