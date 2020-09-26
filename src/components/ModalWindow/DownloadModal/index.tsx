import React from 'react';
import { Select } from 'antd';
import store from 'store';


let selectedValue = 'txt';

const download = (text) => {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:text/${selectedValue};charset=utf-8,${encodeURIComponent(text)}`,
  );
  element.setAttribute('download', `Schedule.${selectedValue}`);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
const downloadDocument = (): void => {
  let schedule;

  const { data } = store.getState().events;
  const workableArray = [];
  data.forEach((e) => {
    workableArray.push(e);
  });
  workableArray.sort((a, b) => {
    const dateA = Date.parse(
      a.dateTime.slice(5).split('.').reverse().join('-'),
    );
    const dateB = Date.parse(
      b.dateTime.slice(5).split('.').reverse().join('-'),
    );
    if (dateA > dateB) {
      return 1;
    }
    if (dateA < dateB) {
      return -1;
    }
    return 0;
  });

  switch (selectedValue) {
    case 'txt':
      schedule = workableArray
        .map((e) => {
          return `${e.dateTime}\n    ${e.name}\n    ${e.description}\n    ${e.descriptionUrl}\n    ${e.type}\n    ${e.eventTime} MSK`;
        })
        .join('\n\n');

      break;
    case 'cvs':
      schedule = 'cvs format';
      break;
    default:
      schedule = 'null';
  }

  download(schedule);
};

const DownloadModal: React.FC = () => {
  const { Option } = Select;
  const changeHandler = (value: string) => {
    selectedValue = value;
  };

  return (
    <>
      <Select onChange={changeHandler} defaultValue="txt">
        <Option value="txt">txt</Option>
        <Option value="csv">csv</Option>
        <Option value="pdf">pdf</Option>
      </Select>
    </>
  );
};

export { downloadDocument };
export default DownloadModal;
