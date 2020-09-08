import * as React from 'react';

import { HeartTwoTone, DownloadOutlined, SettingOutlined } from '@ant-design/icons';

import './index.scss';

const ToolBar: React.FC = () => {
  return (
    <div className="toolbar">
      <a href="/">
        <HeartTwoTone twoToneColor="#eb2f96" />
      </a>
      <a href="/">
        <DownloadOutlined />
      </a>
      <a href="/">
        <SettingOutlined style={{ color: 'black' }} />
      </a>
    </div>
  );
};
export default ToolBar;
