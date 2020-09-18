import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'reducers/app';
import eventsReducer from 'reducers/events';
import organizersReducer from 'reducers/organizers';
import columnVisibilityReducer from 'reducers/columnVisibility';
import settingReducer from 'reducers/settings';
import colorsReducer from 'reducers/eventTypeColors';
import roleReducer from 'reducers/role';

const store = configureStore({
  reducer: {
    app: appReducer,
    events: eventsReducer,
    organizers: organizersReducer,
    column: columnVisibilityReducer,
    settings: settingReducer,
    colors: colorsReducer,
    role: roleReducer,
  },
});

store.subscribe(() => console.log(store.getState().events.data));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
