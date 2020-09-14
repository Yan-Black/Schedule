export interface User {
  key: number;
  name: string;
  editable: boolean;
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
  place?: string;
  additional1?: string;
  additional2?: string;
  additional3?: string;
}

export interface WeekData {
  key: number;
  name: string;
  weekData: JSX.Element;
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
