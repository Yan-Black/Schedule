const timeZone: string[] = [
  'UTC−12:00',
  'UTC−11:00',
  'UTC−10:00',
  'UTC−09:00',
  'UTC−07:00',
  'UTC−06:00',
  'UTC−05:00',
  'UTC−04:00',
  'UTC−03:00',
  'UTC−02:00',
  'UTC−01:00',
  'UTC±00:00',
  'UTC+01:00',
  'UTC+02:00',
  'UTC+03:00',
  'UTC+04:00',
  'UTC+05:00',
  'UTC+06:00',
  'UTC+07:00',
  'UTC+08:00',
  'UTC+09:00',
  'UTC+10:00',
  'UTC+11:00',
  'UTC+12:00',
  'UTC+13:00',
  'UTC+14:00',
];

const backgrounds: string[] = ['#000', '#fff', '#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#5300EB'];

const tasks: string[] = [
  'Online lection',
  'Task start',
  'Optional task start',
  'Optional task deadline',
  'Self education',
  'Meetup - offline',
  'Live coding',
  'Task deadline',
  'Test (with grade)',
  'Cross-check start',
  'Cross-ckeck deadline',
  'Test (without grade)',
  'Interwiev start',
];

const teamId = '48';
export const getAllEventsUrl = `/team/${teamId}/events`;
export const postEventUrl = `/team/${teamId}/event`;
export const getEventUrl = (eId: string): string => `team/${teamId}/event/${eId}`;
export const putEventUrl = (eId: string): string => `team/${teamId}/event/${eId}`;
export const deleteEventUrl = (eId: string): string => `team/${teamId}/event/${eId}`;
export const getAllOrganizers = `/team/${teamId}/organizers`;
export const postOrganizer = `/team/${teamId}/organizer`;
export const getOrganizer = (orgId: string): string => `team/${teamId}/event/${orgId}`;
export const putOrganizer = (orgId: string): string => `team/${teamId}/event/${orgId}`;
export const deleteOrganizer = (orgId: string): string => `team/${teamId}/event/${orgId}`;

export { timeZone, backgrounds, tasks };
