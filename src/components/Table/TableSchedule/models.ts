export interface User {
  key: number;
  name: string;
}

export interface ScheduleData {
  comments?: string;
  deadlineDay?: string;
  deadlineTime?: string;
  key: number;
  name: string;
  startDay?: string;
  startTime?: string;
  type?: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text' | 'integer' | 'decimal' | 'local datetime' | 'instant';
  record: ScheduleData;
  index: number;
  children: React.ReactNode;
}
