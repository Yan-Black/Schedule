import { createSlice } from '@reduxjs/toolkit';
import { EventColor, EventTypeColorsState } from './models';

const initialState: EventTypeColorsState = {
  onlineLecture: 'china-ivory',
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
    changeEventColor: (state, action: { payload: EventColor }) => {
      state[action.payload.event] = action.payload.colorName;
    },
  },
});

export const { changeEventColor } = eventTypeColorsSlice.actions;
export default eventTypeColorsSlice.reducer;
