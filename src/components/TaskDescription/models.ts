export interface TaskSection {
  name: string;
  id: string;
}

export type TaskSections = Array<TaskSection>;

export interface Review {
  feedBack: {
    review: string;
    stars: number;
  };
}
