import { FormInstance } from 'antd/lib/form';
import { StudyEvent } from 'reducers/events/models';
import { Organizer } from 'reducers/organizers/models';

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
  isLoad: boolean;
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
    | ((_: ScheduleData, record: ScheduleData) => JSX.Element)
    | ((text: string, record: ScheduleData) => JSX.Element);
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

export interface OkButtonProps {
  recordKey: number;
  form: FormInstance<any>;
  setEditingKey: React.Dispatch<React.SetStateAction<string>>;
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
  sortedData: ScheduleData[];
  organizers: Organizer[];
}

export interface CloseButtonProps {
  setEditingKey: React.Dispatch<React.SetStateAction<string>>;
}

export interface EditButtonProps {
  recordData: ScheduleData;
  setEditingKey: React.Dispatch<React.SetStateAction<string>>;
  organizers: Organizer[];
  form: FormInstance<any>;
}

export interface DeleteButtonProps {
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
  events: StudyEvent[];
  recordId: string;
}

export interface AddButtonProps {
  sortedData: ScheduleData[];
  events: StudyEvent[];
  ind: number;
}

export interface HideButtonProps {
  selectedRowKeys: number[];
  setHiddenRowKeys: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface ShowButtonProps {
  hiddenRowKeys: number[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<any[]>>;
  setHiddenRowKeys: React.Dispatch<React.SetStateAction<any[]>>;
}
