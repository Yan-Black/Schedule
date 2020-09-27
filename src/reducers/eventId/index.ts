import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  eventId: '',
  isOpen: false,
  taskType: '',
  isEditMode: false,
};

const eventPageSlice = createSlice({
  name: 'eventId',
  initialState,
  reducers: {
    setEventPageId: (state, { payload }: PayloadAction<string>) => {
      state.eventId = payload;
      state.isOpen = true;
    },
    closeEventPage: (state) => {
      state.isOpen = false;
      state.eventId = '';
      state.isEditMode = false;
    },
    setTaskType: (state, { payload }: PayloadAction<string>) => {
      state.taskType = payload;
    },
    enableEditMode: (state) => {
      state.isEditMode = true;
    },
    disableEditMode: (state) => {
      state.isEditMode = false;
    },
  },
});

export const {
  setEventPageId,
  closeEventPage,
  setTaskType,
  enableEditMode,
  disableEditMode,
} = eventPageSlice.actions;
export default eventPageSlice.reducer;
