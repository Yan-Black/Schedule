import { createSlice } from '@reduxjs/toolkit';
import { TableColumn, TypeColumn } from './models';

const firstState: TableColumn = {
  startDay: true,
  startTime: true,
  name: true,
  type: true,
  place: true,
  materials: true,
  lector: true,
  comments: true,
  additional1: true,
  additional2: true,
  additional3: true,
  operation: true,
};

const currentState = localStorage.getItem('columns');

const initialState: TableColumn = currentState === null ? firstState : <TableColumn>JSON.parse(currentState);

const columnVisibilitySlice = createSlice({
  name: 'columnVisibility',
  initialState,
  reducers: {
    changeColumnVisibility: (state, action: { payload: TypeColumn }) => {
      const { event, status } = action.payload;
      state[event] = status;
    },
  },
});

export const { changeColumnVisibility } = columnVisibilitySlice.actions;
export default columnVisibilitySlice.reducer;
