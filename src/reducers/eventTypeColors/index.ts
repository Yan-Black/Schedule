/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import { EventTypeColorsState } from './models';

const initialState: EventTypeColorsState = {
  task: 'green-light',
  lection: 'yellow-light',
  test: 'red-light',
};

const eventTypeColorsSlice = createSlice({
  name: 'eventTypeColors',
  initialState,
  reducers: {
    changeTaskColor: (state, { payload }) => state.task = payload,
    changeLectionColor: (state, { payload }) => state.lection = payload,
    changeTestColor: (state, { payload }) => state.test = payload,
  },

});

export const { changeTaskColor, changeLectionColor, changeTestColor } = eventTypeColorsSlice.actions;
export default eventTypeColorsSlice.reducer;
