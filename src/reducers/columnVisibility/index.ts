import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableColumn, TypeColumn } from './models';

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
