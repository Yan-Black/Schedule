import * as React from 'react';
import { Tabs as TabsWrapper } from 'antd';
import {
  CalendarOutlined,
  UnorderedListOutlined,
  TabletOutlined,
} from '@ant-design/icons';

import Table from 'components/Table';
import CalendarComponent from 'components/Calendar';
import List from 'components/List';
import ToolBar from 'components/ToolBar';

import './index.scss';

const Tabs: React.FC = () => {
  const { TabPane } = TabsWrapper;

  return (
    <TabsWrapper className="container" tabBarExtraContent={<ToolBar />}>
      <TabPane
        key="Table"
        tab={
          <span>
            <TabletOutlined />
            Table
          </span>
        }
      >
        <Table />
      </TabPane>

      <TabPane
        key="Calendar"
        tab={
          <span>
            <CalendarOutlined />
            Calendar
          </span>
        }
      >
        <CalendarComponent />
      </TabPane>

      <TabPane
        key="List"
        tab={
          <span>
            <UnorderedListOutlined />
            List
          </span>
        }
      >
        <List />
      </TabPane>
    </TabsWrapper>
  );
};
export default Tabs;
