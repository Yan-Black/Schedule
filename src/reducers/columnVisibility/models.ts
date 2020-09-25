// export interface TableColumn {
//   startDay: boolean;
//   startTime: boolean;
//   name: boolean;
//   type: boolean;
//   place: boolean;
//   materials: boolean;
//   lector: boolean;
//   comments: boolean;
//   additional1: boolean;
//   additional2: boolean;
//   additional3: boolean;
//   operation: boolean;
// }

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
  // additional1: {
  //   status: boolean;
  //   name: string;
  // };
  // additional2: {
  //   status: boolean;
  //   name: string;
  // };
  // additional3: {
  //   status: boolean;
  //   name: string;
  // };
  operation: {
    status: boolean;
    name: string;
  };
}

export interface TypeColumn {
  event: string;
  checked: boolean;
  columnName: string;
}
