import * as React from 'react';
import { Link } from 'react-router-dom';

import ToolBar from 'components/Header/ToolBar';
import RoleSwitcher from 'components/Header/RoleSwitcher';
import logoImg from '../../assets/icons/logo-rsschool.png';

import './index.scss';

const Header: React.FC = () => {
  return (
    <>
      <div className="header  container">
        <Link to="/">
          <h1>
            <img src={logoImg} alt=" " />
          </h1>
        </Link>
<RoleSwitcher />
      </div>
    </>
  );
};
export default Header;
