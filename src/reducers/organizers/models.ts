export interface Organizer {
  id?: string;
  name: string;
}

export interface InitialOrganizerState {
  data: Organizer[];
  loading: boolean;
  error: null | string | unknown;
}
