export interface StudyEvent {
  organizerId?: string;
  key?: string;
  eventTime?: string;
  place?: string;
  descriptionUrl?: string;
  timeZone?: string;
  comment?: string;
  dateTime?: string;
  type?: string;
  description?: string;
  name?: string;
  id?: string;
  week?: string;
  details?: TaskTypes;
  additional1?: string;
  additional2?: string;
  additional3?: string;
  feedBack?: Feedbacks;
  totalRaiting?: number;
}

export interface InitialStudyEventState {
  data: StudyEvent[];
  loading: boolean;
  error: null | string | unknown;
  isLoading: boolean;
  favorite: boolean;
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

export interface Feedback {
  author?: string;
  raiting?: number;
  text?: string;
}

export interface Feedbacks {
  comments?: Array<Feedback>;
  isEnableAddReview?: boolean;
}
