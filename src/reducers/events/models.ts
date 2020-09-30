export interface StudyEvent {
  organizerId?: string;
  coords?: number[];
  address?: string;
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
  favourite?: boolean;
}

export interface InitialStudyEventState {
  data: StudyEvent[];
  loading: boolean;
  error: null | string | unknown;
  isLoading: boolean;
  favourite: boolean;
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
  deadline?: string;
  folderName?: string;
  branchName?: string;
  taskGoals?: string;
  appFeatures?: string;
  taskFeatures?: string;
  demo?: string;
  taskSpecification?: string;
  repositoryRequires?: string;
  technicalRequires?: string;
  answersDoc?: string;
  crossCheck?: string;
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
