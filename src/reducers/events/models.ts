export interface StudyEvent {
  lector?: string;
  key?: string;
  eventTime?: string;
  place: string;
  descriptionUrl: string;
  timeZone: string;
  comment: string;
  dateTime: string;
  type: string;
  description: string;
  name: string;
  id: string;
  week?: string;
  details: TaskTypes;
}

export interface InitialStudyEventState {
  data: StudyEvent[];
  loading: boolean;
  error: null | string | unknown;
}

export interface TaskTypes {
  taskType: string;
  taskList?: string;
  criteria?: string;
  submit?: string;
  howToCheck?: string;
  materials?: string;
  description?: string;
  requirement?: string;
  questionsExamples?: string;
  marks?: string;
  taskDeadline?: string;
  program?: string;
  language?: string;
  place?: string;
}
