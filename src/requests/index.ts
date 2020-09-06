import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils';
import { getAllEventsUrl } from 'constants/index';
import { StudyEvent } from 'reducers/events/models';

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
