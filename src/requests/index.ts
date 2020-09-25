import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils';
import {
  getAllEventsUrl,
  getAllOrganizers,
  postEventUrl,
  postOrganizer,
} from '@constants/api';
import { StudyEvent } from 'reducers/events/models';
import { Organizer } from 'reducers/organizers/models';
import { errorHandler } from '@constants';

export default createAsyncThunk(
  'events/fetchStudyEvents',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      }: { data: { data: StudyEvent[] } } = await axios.get(getAllEventsUrl);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const fetchOrganizres = createAsyncThunk(
  'organizers/fetchOrganizres',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      }: { data: { data: Organizer[] } } = await axios.get(getAllOrganizers);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const postEvent = createAsyncThunk(
  'events/postEvent',
  async (obj: StudyEvent, { rejectWithValue }) => {
    try {
      const {
        data: { id },
      }: { data: { id: string } } = await axios.post(postEventUrl, obj);
      const newEvent = { ...obj };
      newEvent.id = id;
      return newEvent;
    } catch (e) {
      return rejectWithValue(errorHandler());
    }
  },
);

export const postLector = createAsyncThunk(
  'organizers/postOrganizer',
  async (obj: Organizer, { rejectWithValue }) => {
    try {
      const {
        data: { id },
      }: { data: { id: string } } = await axios.post(postOrganizer, obj);
      const newOrganizer = { ...obj };
      newOrganizer.id = id;
      return newOrganizer;
    } catch (e) {
      return rejectWithValue(errorHandler());
    }
  },
);
