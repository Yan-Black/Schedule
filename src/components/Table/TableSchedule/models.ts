export interface User {
  key: number;
  name: string;
  editable: boolean;
}

export interface ScheduleData {
  lector?: string;
  comments?: string;
  deadlineDay?: string;
  deadlineTime?: string;
  key: number;
  name: string;
  startDay: string;
  startTime?: string;
  type: string;
  place?: string;
  materials: string;
  description: string;
  additional1?: string;
  additional2?: string;
  additional3?: string;
  id: string;
  week?: string;
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
  inputType: 'date' | 'time' | 'text' | 'number';
  record: ScheduleData;
  index: number;
  children: React.ReactNode;
  handleDate?: (date, dateString: string) => void;
  handleWeek?: (value: number) => void;
}
