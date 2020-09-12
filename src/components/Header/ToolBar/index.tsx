import * as React from 'react';
import Settings from '../../Settings';

import './index.scss';

const ToolBar: React.FC = () => {
  return (
    <div className="toolbar  container">
      <Settings />
      icons (heart, download, settings)
    </div>
  );
};
export default ToolBar;
