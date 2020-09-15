import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils';
import { getAllEventsUrl, getAllOrganizers } from 'constants/index';
import { StudyEvent } from 'reducers/events/models';
import { Organizer } from 'reducers/organizers/models';

export default createAsyncThunk('events/fetchStudyEvents', async (_, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    }: { data: { data: StudyEvent[] } } = await axios.get(getAllEventsUrl);
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const fetchOrganizres = createAsyncThunk('organizers/fetchOrganizres', async (_, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    }: { data: { data: Organizer[] } } = await axios.get(getAllOrganizers);
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});
