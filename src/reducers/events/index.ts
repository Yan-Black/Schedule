import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { recountDate } from 'helpers';
import fetchStudyEvents from 'requests';
import { InitialStudyEventState, StudyEvent } from './models';

const initialState: InitialStudyEventState = {
  data: [],
  loading: true,
  error: null,
};

const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    deleteEvent: (state, { payload }: PayloadAction<number>) => {
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
    updateEventsTime: (state, { payload }: PayloadAction<string>) => {
      state.data.forEach(recountDate.bind(null, payload));
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

export const {
  deleteEvent,
  changeEvent,
  updateEventsTime,
  addEvent,
} = eventsSlice.actions;
export default eventsSlice.reducer;
