import * as React from 'react';
import { Link } from 'react-router-dom';

import ToggleUser from 'components/ToggleUser';
import logoImg from '../../assets/icons/logo-rsschool.png';

import './index.scss';

const Header: React.FC = () => {
  return (
    <>
      <div className="header container">
        <Link to="/">
          <h1>
            <img src={logoImg} alt=" " />
          </h1>
        </Link>
        <ToggleUser />
      </div>
    </>
  );
};
export default Header;
