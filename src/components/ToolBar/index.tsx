import * as React from 'react';

import { HeartTwoTone, DownloadOutlined } from '@ant-design/icons';
import Setting from '../Settings';
import ColumnVisibility from '../ColumsVisibility';
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
      <Setting />
      <ColumnVisibility />
    </div>
  );
};
export default ToolBar;
