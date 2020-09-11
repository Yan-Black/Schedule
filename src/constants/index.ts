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
