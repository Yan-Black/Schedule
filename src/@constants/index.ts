import { TaskSections } from '../components/TaskDescription/models';

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

export const codewarsSections: TaskSections = [
  {
    name: 'Список заданий',
    id: 'taskList',
  },
  {
    name: 'Критерии оценки',
    id: 'criteria',
  },
  {
    name: 'Как сабмитнуть',
    id: 'submit',
  },
  {
    name: 'Auto-check',
    id: 'howToCheck',
  },
  {
    name: 'Материалы',
    id: 'materials',
  },
];

export const coreJsSections: TaskSections = [
  {
    name: 'Описание заданий',
    id: 'description',
  },
  {
    name: 'Требования для установки',
    id: 'requirement',
  },
  {
    name: 'Как сабмитнуть',
    id: 'submit',
  },
  {
    name: 'Материалы',
    id: 'materials',
  },
];

export const interviewSections: TaskSections = [
  {
    name: 'Примеры вопросов',
    id: 'questionsExamples',
  },
  {
    name: 'Критерии оценки',
    id: 'marks',
  },
  {
    name: 'Дата дедлайна',
    id: 'taskDeadline',
  },
];

export const meetupSections: TaskSections = [
  {
    name: 'Программа',
    id: 'program',
  },
  {
    name: 'Язык выступления',
    id: 'language',
  },
  {
    name: 'Место встречи',
    id: 'place',
  },
];

export const globalFunctions: {
  [key: string]: (key?: unknown) => void | unknown;
} = {};
