import { createSlice } from '@reduxjs/toolkit';
import { EventColor, EventTypeColorsState } from './models';

const firstState: EventTypeColorsState = {
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

const currentState = localStorage.getItem('colors');

const initialState: EventTypeColorsState =
  currentState === null ? firstState : <EventTypeColorsState>JSON.parse(currentState);

const eventTypeColorsSlice = createSlice({
  name: 'EventTypeColorsState',
  initialState,
  reducers: {
    changeEventColor: (state, action: { payload: EventColor }) => {
      const { event, color } = action.payload;
      state[event] = color;
    },
  },
});

export const { changeEventColor } = eventTypeColorsSlice.actions;
export default eventTypeColorsSlice.reducer;
