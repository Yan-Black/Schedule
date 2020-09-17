import { createSlice } from '@reduxjs/toolkit';

const weeksSlice = createSlice({
  name: 'weeksState',
  initialState: 0,
  reducers: {
    setWeeksAmount: (state, { payload }) => {
      state = payload;
    },
  },
});

export const { setWeeksAmount } = weeksSlice.actions;
export default weeksSlice.reducer;
