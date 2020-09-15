import { Select } from 'antd';
import * as React from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { switchRole } from 'reducers/role';
import { userRoles } from '../../../constants';


const RoleSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const changeHandler = (value: any) => {
    dispatch(switchRole(value));
  };
  const { Option } = Select;
  return (
    <Select className='header__roleSwitcher roleSwitcher' onChange={changeHandler} defaultValue="Student">
      {userRoles.map((role: string) => {
        return <Option className="roleSwitcher__point" value={role} key={role}>{role}</Option>
      })}
    </Select>
  )
};
export default RoleSwitcher;
