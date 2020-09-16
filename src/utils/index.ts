import axios from 'axios';

export default axios.create({
  baseURL: 'https://rs-react-schedule.firebaseapp.com/api',
  responseType: 'json',
});

export const getKeyByValue = (
  obj: { [x: string]: string },
  value: string,
): string => Object.keys(obj).find((key) => obj[key] === value);

