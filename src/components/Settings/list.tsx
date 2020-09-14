import * as React from 'react';
import { FieldTimeOutlined, TeamOutlined } from '@ant-design/icons';
import { timeZone } from '../../constants';

const selectList: {
  title: string;
  name: string;
  options: string[];
  icon: () => JSX.Element;
}[] = [
  {
    title: 'Timezone',
    name: 'time',
    options: timeZone,
    icon: (): JSX.Element => <FieldTimeOutlined className="settings__icon" />,
  },
  {
    title: 'Format meeting',
    name: 'meeting',
    options: ['Online and offline', 'Online', 'Offline'],
    icon: (): JSX.Element => <TeamOutlined className="settings__icon" />,
  },
];

export default selectList;
