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
}

export interface InitiaiStudyEventState {
  data: StudyEvent[];
  loading: boolean;
  error: null | string | unknown;
}
