import * as React from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { switchRole } from 'reducers/role';
import { userRoles } from '../../../constants';

const RoleSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const changeHandler = (e: any) => {
    dispatch(switchRole(e.target.value));
  };
  const arrOfRoleNodes = userRoles.map((role: string) => {
    return <option className="roleSwitcher__point" value={role} key={role}>{role[0].toUpperCase() + role.slice(1)}</option>
  })
  return (
    <select className='header__roleSwitcher roleSwitcher' onChange={changeHandler}>
      {arrOfRoleNodes}
    </select>
  )
};
export default RoleSwitcher;
