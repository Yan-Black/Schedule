import { StudyEvent } from 'reducers/events/models';

const teamId = '48';
export const getAllEventsUrl = `/team/${teamId}/events`;
export const postEventUrl = `/team/${teamId}/event`;
export const getEventUrl = (eId: string): string =>
  `team/${teamId}/event/${eId}`;
export const putEventUrl = (eId: string): string =>
  `team/${teamId}/event/${eId}`;
export const deleteEventUrl = (eId: string): string =>
  `team/${teamId}/event/${eId}`;
export const getAllOrganizers = `/team/${teamId}/organizers`;
export const postOrganizer = `/team/${teamId}/organizer`;
export const getOrganizer = (orgId: string): string =>
  `team/${teamId}/event/${orgId}`;
export const putOrganizer = (orgId: string): string =>
  `team/${teamId}/event/${orgId}`;
export const deleteOrganizer = (orgId: string): string =>
  `team/${teamId}/event/${orgId}`;

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
