import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from './modules';

const firstState: Role = { currentRole: 'Student' };

const currentState: string = localStorage.getItem('role');

const initialState: Role =
  currentState === null ? firstState : <Role>JSON.parse(currentState);

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state: Role, { payload }: PayloadAction<string>) => {
      state.currentRole = payload;
    },
  },
});

export const { switchRole } = roleSlice.actions;
export default roleSlice.reducer;
