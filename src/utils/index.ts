import axios from 'axios';

export default axios.create({
  baseURL: 'https://rs-react-schedule.firebaseapp.com/api',
  responseType: 'json',
});

const getKeyByValue = (obj: { [x: string]: string }, value: string) => Object.keys(obj).find((key) => obj[key] === value);

export { getKeyByValue };
