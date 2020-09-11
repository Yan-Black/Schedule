import { createSlice } from '@reduxjs/toolkit';
import { EventColor, EventTypeColorsState } from './models';

const initialState: EventTypeColorsState = {
  onlineLection: 'china-ivory',
  meetupOffline: 'vanilla-ice',
  taskStart: 'white-ice',
  taskDeadline: 'blue-chalk',
  optionalTaskStart: 'remy',
  optionalTaskDeadline: 'humming-bird',
  selfEducation: 'pattens-blue-light',
  testGrade: 'sazerac',
  testWithoutGrade: 'white-lilac',
  crossCheckStart: 'blanched-almond',
  crossCheckDeadline: 'white-ice-light',
  interviewStart: 'pattens-blue',
};

const eventTypeColorsSlice = createSlice({
  name: 'eventTypeColors',
  initialState,
  reducers: {
    changeEventColor: (state, { payload }) => {
      const { event, color }: EventColor = payload;
      state[event] = color;
    },
  },
});

export const { changeEventColor } = eventTypeColorsSlice.actions;
export default eventTypeColorsSlice.reducer;
