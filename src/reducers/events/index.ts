import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchStudyEvents from 'requests';
import { InitialStudyEventState, StudyEvent } from './models';

const initialState: InitialStudyEventState = {
  data: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    deleteEvent: (state, { payload }) => {
      state.data.splice(payload, 1);
    },
    changeEvent: (
      state,
      {
        payload,
      }: PayloadAction<{ changedEvent: StudyEvent; changedInd: number }>,
    ) => {
      state.data.splice(payload.changedInd, 1, payload.changedEvent);
    },
    addEvent: (state, { payload }) => {
      state.data.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudyEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStudyEvents.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(fetchStudyEvents.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { deleteEvent, changeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
