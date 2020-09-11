import { createSlice } from '@reduxjs/toolkit';
import { TableColumn } from './models';

const initialState: TableColumn = {
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
}

const columnVisibilitySlice = createSlice({
  name: 'columnVisibility',
  initialState,
  reducers: {  },
});

// export const { deleteEvent } = eventsSlice.actions;
export default columnVisibilitySlice.reducer;
