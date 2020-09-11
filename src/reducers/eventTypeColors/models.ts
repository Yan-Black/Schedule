export interface EventTypeColorsState {
  onlineLection: string;
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

export interface EventColor {
  event: string;
  colorName: string;
}
