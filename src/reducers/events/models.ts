export interface StudyEvent {
  place: string;
  descriptionUrl: string;
  timeZone: string;
  comment: string;
  dateTime: string;
  eventTime: string;
  type: string;
  description: string;
  name: string;
  id: string;
}

export interface InitialStudyEventState {
  data: StudyEvent[];
  loading: boolean;
  error: null | string | unknown;
}
