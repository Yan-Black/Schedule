export interface TableColumn {
  startDay: {
    status: boolean;
    name: string;
  };
  startTime: {
    status: boolean;
    name: string;
  };
  name: {
    status: boolean;
    name: string;
  };
  type: {
    status: boolean;
    name: string;
  };
  place: {
    status: boolean;
    name: string;
  };
  materials: {
    status: boolean;
    name: string;
  };
  lector: {
    status: boolean;
    name: string;
  };
  comments: {
    status: boolean;
    name: string;
  };
  operation: {
    status: boolean;
    name: string;
  };
  [x: string]: {
    status: boolean;
    name: string;
  }
}

export interface TypeColumn {
  event: string;
  checked: boolean;
  columnName: string;
}
