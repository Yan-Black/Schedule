export interface StudyEvent {
  place: string;
  descriptionUrl: string;
  timeZone: string;
  comment: string;
  dateTime: string;
  type: string;
  description: string;
  name: string;
  id: string;
}

export interface InitiaiStudyEventState {
  data: StudyEvent[];
  loading: boolean;
  error: null | string | unknown;
}
