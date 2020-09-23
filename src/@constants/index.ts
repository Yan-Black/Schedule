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

export const permanentColumns: string[] = ['Date', 'Name', 'Type', 'Action'];

export const eventTypes = {
  onlineLecture: 'Online lecture',
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
export const columns = {
  startDay: 'Date',
  startTime: 'Time',
  name: 'Name',
  type: 'Type',
  place: 'Place',
  materials: 'Materials',
  lector: 'Lector',
  comments: 'Comments',
  additional1: 'Additional',
  additional2: 'Additional',
  additional3: 'Additional',
  operation: 'Action',
};

export const userRoles: string[] = ['Student', 'Mentor'];

export const taskTypes = {
  codewars: 'Codewars',
  coreJS: 'Core JS',
  interview: 'Interview',
  meetup: 'Meetup',
  standartTask: 'Standart task',
};

export const globalFunctions: {
  [key: string]: (key?: unknown) => void | unknown;
} = {};
