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
