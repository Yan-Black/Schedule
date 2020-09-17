export interface EventTypeColorsState {
  onlineLecture: string;
  meetupOffline: string;
  taskStart: string;
  taskDeadline: string;
  optionalTaskStart: string;
  optionalTaskDeadline: string;
  selfEducation: string;
  testGrade: string;
  testWithoutGrade: string;
  crossCheckStart: string;
  crossCheckDeadline: string;
  interviewStart: string;
}

export type EventColor = {
  event: string;
  color: string;
};
