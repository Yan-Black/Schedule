import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { setFont } from 'helpers';

import './index.scss';

const Footer: React.FC = () => {
  const currentVisual = useSelector(
    (state: RootState) => state.settings.visual,
  );
  const font = setFont(currentVisual);
  return (
    <div className="footer container">
      <p style={font}>© The Rolling Scopes 2020 | Create by team 48</p>
    </div>
  );
};

export default Footer;
