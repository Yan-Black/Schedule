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

export const utcOffsets: { [x: string]: string } = {
  'Europe/London': '1',
  'Europe/Warsaw': '2',
  'Europe/Kiev': '3',
  'Europe/Minsk': '3',
  'Europe/Moscow': '3',
  'Europe/Volgograd': '4',
  'Europe/Yekaterenburg': '5',
  'Asia/Tashkent': '5',
  'Asia/Tbilisi': '4',
}

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

export const listMarkerColors = {
  onlineLecture: '#F1C40F',
  meetupOffline: '#C0392B',
  taskStart: '#27AE60',
  taskDeadline: '#E74C3C',
  optionalTaskStart: '#1ABC9C',
  optionalTaskDeadline: '#E74C3C',
  selfEducation: '#2980B9',
  testGrade: '#D35400',
  testWithoutGrade: '#9B59B6',
  crossCheckStart: '#F39C12',
  crossCheckDeadline: '#E74C3C',
  interviewStart: '#3498DB',
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
export const globalFunctions: {
  [key: string]: (key?: unknown) => void | unknown;
} = {};

export const errorHandler = (): void => {
  globalFunctions.showModalWindow();
};
