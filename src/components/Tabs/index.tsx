import * as React from 'react';
import { Tabs as TabsWrapper } from 'antd';
import { Link, Route, useLocation } from 'react-router-dom';
import {
  CalendarOutlined,
  UnorderedListOutlined,
  TableOutlined,
} from '@ant-design/icons';

import Table from 'components/Table';
import Calendar from 'components/Calendar';
import List from 'components/List';
import ToolBar from 'components/ToolBar';

import './index.scss';

const Tabs: React.FC = () => {
  const { TabPane } = TabsWrapper;
  const location = useLocation();
  const currentLocation = () => location.pathname;

  return (
    <TabsWrapper
      className="container"
      activeKey={currentLocation()}
      defaultActiveKey="/"
      tabBarExtraContent={<ToolBar />}
    >
      <TabPane
        key="/"
        tab={
          <Link to="/">
            <span>
              <TableOutlined />
              Table
            </span>
          </Link>
        }
      >
        <Route path="/" component={Table} />
      </TabPane>

      <TabPane
        key="/calendar"
        tab={
          <Link to="/calendar">
            <span>
              <CalendarOutlined />
              Calendar
            </span>
          </Link>
        }
      >
        <Route path="/calendar" component={Calendar} />
      </TabPane>

      <TabPane
        key="/list"
        tab={
          <Link to="/list">
            <span>
              <UnorderedListOutlined />
              List
            </span>
          </Link>
        }
      >
        <Route path="/list" component={List} />
      </TabPane>
    </TabsWrapper>
  );
};

export default Tabs;
