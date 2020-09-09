import * as React from 'react';
import { ReadOutlined, FieldTimeOutlined, DownloadOutlined, TeamOutlined } from '@ant-design/icons';
import { timeZone } from '../../constants';

const selectList: {
  title: string;
  options: string[];
  icon: () => JSX.Element;
}[] = [
  {
    title: 'Select view',
    options: ['List', 'Calendar'],
    icon: (): JSX.Element => <ReadOutlined className="schedule-customizations__icon" />,
  },
  {
    title: 'Select timezone',
    options: timeZone,
    icon: (): JSX.Element => <FieldTimeOutlined className="schedule-customizations__icon" />,
  },
  {
    title: 'Select format',
    options: ['txt', 'pdf', 'csv'],
    icon: (): JSX.Element => <DownloadOutlined className="schedule-customizations__icon" />,
  },
  {
    title: 'Select format meeting',
    options: ['Online and offline', 'Online', 'Offline'],
    icon: (): JSX.Element => <TeamOutlined className="schedule-customizations__icon" />,
  },
];

export default selectList;
