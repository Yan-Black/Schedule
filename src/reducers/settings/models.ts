export interface Settings {
  view: string;
  time: string;
  meeting: string;
  merge: boolean;
  visual: boolean;
}

export type EventSettings = {
  event: string;
  value: string | boolean;
};
