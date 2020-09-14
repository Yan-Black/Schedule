export interface Settings {
  time: string;
  meeting: string;
  merge: boolean;
  visual: boolean;
}

export type EventSettings = {
  event: string;
  value: string | boolean;
};
