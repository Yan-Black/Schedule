import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'reducers/app';
import eventsReducer from 'reducers/events';
import organizersReducer from 'reducers/organizers';
import settingReducer from 'reducers/settings';
import colorsReducer from 'reducers/eventTypeColors';
import roleReducer from 'reducers/role';

const store = configureStore({
  reducer: {
    app: appReducer,
    events: eventsReducer,
    organizers: organizersReducer,
    settings: settingReducer,
    colors: colorsReducer,
    role: roleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
