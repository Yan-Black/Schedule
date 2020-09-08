import * as React from 'react';
import { RootState } from 'store';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from 'reducers/role';


const RoleSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.role)

  const clickHandler = () => {
    dispatch(switchRole());
  };

  return (
    <span className='header__roleSwitcher' onClick={clickHandler}>
      {role.currentRole === 'student' ? 'Student' : 'Mentor'}
    </span>
  )
};
export default RoleSwitcher;
