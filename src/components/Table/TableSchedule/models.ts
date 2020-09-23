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
  key?: number;
  name?: string;
  startDay: string;
  startTime?: string;
  type: string;
  place?: string;
  materials?: string;
  description?: string;
  additional1?: string;
  additional2?: string;
  additional3?: string;
  id?: string;
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
  inputType: 'date' | 'time' | 'text' | 'number' | 'select';
  record: ScheduleData;
  index: number;
  children: React.ReactNode;
}

export interface MergedColumnsProps {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  number?: number;
  editable?: boolean;
  ellipsis?: {
    showTitle: boolean;
  };
  render?:
    | ((text: string) => JSX.Element)
    | ((address: React.ReactElement, record: ScheduleData) => JSX.Element)
    | ((_: ScheduleData, record: ScheduleData) => JSX.Element);
  fixed?: string;
  filters?: { text: string; value: string }[];
  onFilter?: (value: string, record: ScheduleData) => boolean;
}

export interface FormFields {
  date?: moment.Moment;
  time?: moment.Moment;
  name?: string;
  type?: string;
  place?: string;
  week?: number;
  materials?: string;
  description?: string;
  lector?: string;
  comments?: string;
  additional1?: string;
  additional2?: string;
  additional3?: string;
}
