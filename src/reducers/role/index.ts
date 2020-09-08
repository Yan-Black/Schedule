import { createSlice } from '@reduxjs/toolkit';
import { Role } from './modules';

const initialState: Role = 'student';

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        switchRole: (state: Role) => {
            state = state === 'student' ? 'mentor' : 'student';
        }
    }
})

export const { switchRole } = roleSlice.actions;
export default roleSlice.reducer;
