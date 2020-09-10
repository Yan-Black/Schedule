import * as React from 'react';
import { RootState } from 'store';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from 'reducers/role';
import { userRoles } from '../../../constants';


const RoleSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector((state: RootState) => state.role.currentRole)

  const changeHandler = (e: any) => {
    dispatch(switchRole(e.target.value));
  };
  const arrOfRoleOptionNode = userRoles.map((role: string) => {
    return <option className="roleSwitcher__point" value={role} key={role}>{role[0].toUpperCase() + role.slice(1)}</option>
  })
  return (
    <select className='header__roleSwitcher roleSwitcher' onChange={(e) => changeHandler(e)}>
      {arrOfRoleOptionNode}
    </select>
  )
};
export default RoleSwitcher;
