import * as React from 'react';
import { HeartTwoTone } from '@ant-design/icons';

import Download from '../Download/index';

import Setting from '../Settings';
import './index.scss';

const ToolBar: React.FC = () => {
  return (
    <div className="toolbar">
      <a href="/">
        <HeartTwoTone twoToneColor="#eb2f96" />
      </a>
      <a href="/">
        <Download />
      </a>
      <Setting />
    </div>
  );
};
export default ToolBar;
