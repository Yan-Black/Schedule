import axios from 'axios';

export default axios.create({
  baseURL: 'https://rs-react-schedule.firebaseapp.com/api',
  responseType: 'json',
});
