import * as React from 'react';
import { ReadOutlined, FieldTimeOutlined, TeamOutlined } from '@ant-design/icons';
import { timeZone } from '../../constants';

const selectList: {
  title: string;
  name: string;
  options: string[];
  icon: () => JSX.Element;
}[] = [
  {
    title: 'Select view',
    name: 'view',
    options: ['List', 'Calendar', 'Table'],
    icon: (): JSX.Element => <ReadOutlined className="settings__icon" />,
  },
  {
    title: 'Select timezone',
    name: 'time',
    options: timeZone,
    icon: (): JSX.Element => <FieldTimeOutlined className="settings__icon" />,
  },
  {
    title: 'Select format meeting',
    name: 'meeting',
    options: ['Online and offline', 'Online', 'Offline'],
    icon: (): JSX.Element => <TeamOutlined className="settings__icon" />,
  },
];

export default selectList;
