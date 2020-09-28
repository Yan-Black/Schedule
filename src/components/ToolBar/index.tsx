import * as React from 'react';
import { HeartTwoTone } from '@ant-design/icons';

import Favourite from 'components/Favourite';
import Download from '../Download/index';
import Setting from '../Settings';

import './index.scss';

const ToolBar: React.FC = () => {
  return (
    <div className="toolbar">
      <Favourite />
      <a href="/">
        <Download />
      </a>
      <Setting />
    </div>
  );
};
export default ToolBar;
