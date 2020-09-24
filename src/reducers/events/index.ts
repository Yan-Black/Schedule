import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchStudyEvents, { postEvent } from 'requests';
import { InitialStudyEventState, StudyEvent } from './models';

const initialState: InitialStudyEventState = {
  data: [],
  loading: true,
  idLoading: false,
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
    builder.addCase(postEvent.pending, (state) => {
      state.idLoading = true;
    });
    builder.addCase(postEvent.fulfilled, (state, { payload }) => {
      state.idLoading = false;
      state.data.push(payload);
    });
    builder.addCase(postEvent.rejected, (state, { payload }) => {
      state.idLoading = false;
      state.error = payload;
    });
  },
});

export const { deleteEvent, changeEvent, addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
