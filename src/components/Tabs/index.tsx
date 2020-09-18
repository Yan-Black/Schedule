import * as React from 'react';
import { useSelector } from 'react-redux';
import { Skeleton, Tabs as TabsWrapper } from 'antd';
import { Link, Route, useLocation } from 'react-router-dom';
import {
  CalendarOutlined,
  UnorderedListOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { RootState } from 'store';

import Table from 'components/Table';
import Calendar from 'components/Calendar';
import List from 'components/List';
import ToolBar from 'components/ToolBar';

import './index.scss';

const Tabs: React.FC = () => {
  const { TabPane } = TabsWrapper;
  const location = useLocation();
  const currentLocation = () => location.pathname;
  const isLoading = useSelector((state: RootState) => state.events.loading);

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
        <Route
          path="/calendar"
          render={() => (isLoading ? <Skeleton active /> : <Calendar />)}
        />
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
        <Route
          path="/list"
          render={() => (isLoading ? <Skeleton active /> : <List />)}
        />
      </TabPane>
    </TabsWrapper>
  );
};

export default Tabs;
