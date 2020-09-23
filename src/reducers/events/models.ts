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
  additional1?: string;
  additional2?: string;
  additional3?: string;
}

export interface InitialStudyEventState {
  data: StudyEvent[];
  loading: boolean;
  error: null | string | unknown;
}
