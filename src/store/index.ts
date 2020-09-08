import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'reducers/app';
import eventsReducer from 'reducers/events';
import organizersReducer from 'reducers/organizers';

const store = configureStore({
  reducer: {
    app: appReducer,
    events: eventsReducer,
    organizers: organizersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
