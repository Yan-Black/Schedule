import React from 'react';
import { Select } from 'antd';

let selectedValue = 'txt';
const getFormat = (): string => {
  return selectedValue;
};
const DownloadModal: React.FC = () => {
  const { Option } = Select;
  const changeHandler = (value: string) => {
    selectedValue = value;
  };

  return (
    <Select onChange={changeHandler} defaultValue="txt">
      <Option value="txt">Text</Option>
      <Option value="xls">Excel</Option>
      <Option value="pdf">PDF</Option>
    </Select>
  );
};

export { getFormat };
export default DownloadModal;
