import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableColumn, TypeColumn } from './models';

// const firstState: TableColumn = {
//   startDay: true,
//   startTime: true,
//   name: true,
//   type: true,
//   place: true,
//   materials: true,
//   lector: true,
//   comments: true,
//   operation: true,
//   additional1: false,
//   additional2: false,
//   additional3: false,
// };

const firstState: TableColumn = {
  startDay: {
    status: true,
    name: 'Date',
  },
  startTime: {
    status: true,
    name: 'Time',
  },
  name: {
    status: true,
    name: 'Name',
  },
  type: {
    status: true,
    name: 'Type',
  },
  place: {
    status: true,
    name: 'Place',
  },
  materials: {
    status: true,
    name: 'Materials',
  },
  lector: {
    status: true,
    name: 'Lector',
  },
  comments: {
    status: true,
    name: 'Comments',
  },
  operation: {
    status: true,
    name: 'Action',
  },
  // additional1: {
  //   status: false,
  //   name: 'Additional',
  // },
  // additional2: {
  //   status: false,
  //   name: 'Additional',
  // },
  // additional3: {
  //   status: false,
  //   name: 'Additional',
  // },
};

const currentState = localStorage.getItem('columns');

export const initialState: TableColumn =
  currentState === null ? firstState : <TableColumn>JSON.parse(currentState);

const columnVisibilitySlice = createSlice({
  name: 'columnVisibility',
  initialState,
  reducers: {
    changeColumnVisibility: (state, { payload }: PayloadAction<TypeColumn>) => {
      const { event, checked, columnName } = payload;
      state[event] = {
        status: checked,
        name: columnName,
      };
    },
    deleteColumnVisibility: (state, { payload }: PayloadAction<TypeColumn>) => {
      const { event } = payload;
      delete state[event];
    },
  },
});

export const {
  changeColumnVisibility,
  deleteColumnVisibility,
} = columnVisibilitySlice.actions;
export default columnVisibilitySlice.reducer;
