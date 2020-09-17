import { Select } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { RootState } from 'store';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { switchRole } from 'reducers/role';
import { userRoles } from '../../../constants';

const RoleSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.role);
  useEffect(() => {
    const roleToJSON: string = JSON.stringify(current);
    localStorage.setItem('role', roleToJSON);
  }, [current]);
  const changeHandler = (value: any) => {
    dispatch(switchRole(value));
  };
  const { Option } = Select;
  return (
    <Select className="header__roleSwitcher roleSwitcher" onChange={changeHandler} defaultValue={current.currentRole}>
      {userRoles.map((role: string) => {
        return (
          <Option className="roleSwitcher__point" value={role} key={role}>
            {role}
          </Option>
        );
      })}
    </Select>
  );
};
export default RoleSwitcher;
