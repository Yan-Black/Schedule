export const timeZone: string[] = [
  'Europe/London',
  'Europe/Warsaw',
  'Europe/Kiev',
  'Europe/Minsk',
  'Europe/Moscow',
  'Europe/Volgograd',
  'Europe/Yekaterenburg',
  'Asia/Tashkent',
  'Asia/Tbilisi',
];
// здесь должны быть классы
// export const backgrounds: string[] = [
//   '#E6B0AA',
//   '#F5B7B1',
//   '#D7BDE2',
//   '#E8DAEF',
//   '#A9CCE3',
//   '#AED6F1',
//   '#A3E4D7',
//   '#A2D9CE',
//   '#A9DFBF',
//   '#ABEBC6',
//   '#F9E79F',
//   '#FAD7A0',
//   '#F5CBA7',
//   '#EDBB99',
// ];

export const backgrounds: string[] = [
  'vanilla-ice',
  'remy',
  'white-lilac',
  'blue-chalk',
  'pattens-blue-light',
  'pattens-blue',
  'humming-bird',
  'foam',
  'white-ice-light',
  'white-ice',
  'china-ivory',
  'blanched-almond',
  'serenade',
  'sazerac',
  'azure',
];

// const tasks: string[] = [
//   'online lection',
//   'task start',
//   'optional task start',
//   'optional task deadline',
//   'self education',
//   'meetup-offline',
//   'live coding',
//   'task deadline',
//   'test with grade',
//   'cross-check start',
//   'cross-ckeck deadline',
//   'test without grade',
//   'interwiev start',
// ];

export const eventTypes = {
  onlineLection: 'Online lection',
  meetupOffline: 'Meetup',
  taskStart: 'Task start',
  taskDeadline: 'Task deadline',
  optionalTaskStart: 'Optional task start',
  optionalTaskDeadline: 'Optional task deadline',
  selfEducation: 'Self education',
  testGrade: 'Test with grade',
  testWithoutGrade: 'Test without grade',
  crossCheckStart: 'Cross-check start',
  crossCheckDeadline: 'Cross-check deadline',
  interviewStart: 'Interview start',
};

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

// export { timeZone, backgrounds, eventTypes };
