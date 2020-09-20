import './index.scss';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Collapse, Tabs, Menu, Table, Rate, Button } from 'antd';

import { RootState } from 'store';

import {
  AppstoreOutlined,
  ProfileOutlined,
  PaperClipOutlined,
  StarOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const StandartTask: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);

  if (isLoading) {
    return <p>loading...</p>;
  }

  // handleChange = value => {
  //   this.setState({ value });
  // };

  const columnsTableDeadline = [
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Folder name',
      dataIndex: 'folderExample',
      key: 'folderExample',
    },
    {
      title: 'Branch name',
      dataIndex: 'branchExample',
      key: 'branchExample',
    },
  ];

  const dataTableDeadline = [
    {
      key: '1',
      deadline: '18-09-2020',
      folderExample: 'example-folder',
      branchExample: 'example-branch',
    },
  ];

  return (
    <>
      <div className="task-description-standart">
        <div className="task-description-nav">
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <ProfileOutlined />
                  <span>Кратко</span>
                </span>
              }
            >
              <Menu.Item key="1">Дата сдачи</Menu.Item>
              <Menu.Item key="2">Цели задания</Menu.Item>
              <Menu.Item key="3">Особенности приложения</Menu.Item>
              <Menu.Item key="4">Особенности задания</Menu.Item>
              <Menu.Item key="5">Демо</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<AppstoreOutlined />}
              title="Подбробности"
            >
              <Menu.Item key="6">Описание приложения</Menu.Item>
              <Menu.Item key="7">Требования к репозиторию</Menu.Item>
              <Menu.Item key="8">Технические требования</Menu.Item>
              <Menu.Item key="9">Критерии оценки</Menu.Item>
              <Menu.Item key="10">Оценивания задания</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <PaperClipOutlined />
                  <span>Материалы</span>
                </span>
              }
            >
              <Menu.Item key="11">Полезные ссылки</Menu.Item>
              <Menu.Item key="12">Документ для вопросов</Menu.Item>
              <Menu.Item key="13">Cross-check</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="task-description-area">
          <h2 className="task-main-headline">Название таска</h2>
          <Button type="dashed" icon={<StarOutlined />}>
            Оценить
          </Button>
          <p className="short-task-descr">Краткое описание</p>
          <Table
            className="deadline-table"
            dataSource={dataTableDeadline}
            columns={columnsTableDeadline}
            pagination={false}
          />
          <h3 className="task-add-headline">Цели задания</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h3 className="task-add-headline">Особенности приложения</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h3 className="task-add-headline">Особенности задания</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h3 className="task-add-headline">Демо</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <Collapse accordion>
            <Panel header="Описание приложения" key="1">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
            <Panel header="Требования к репозиторию" key="2">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
            <Panel header="Технические требования" key="3">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
            <Panel header="Критерии оценки" key="4">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
            <Panel header="Оценивания задания" key="5">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
          </Collapse>
          <h2 className="task-main-headline">Дополнительные материалы</h2>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Полезные ссылки" key="1">
              <ol>
                <li>1. Donec vitae sapien</li>
                <li>2. Etiam sit amet</li>
                <li>3. Sed fringilla fraucibus reture mauris</li>
              </ol>
            </TabPane>
            <TabPane tab="Документ для вопросов" key="2">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Cross-check" key="3">
              Content of Tab Pane 1
            </TabPane>
          </Tabs>
          <h2 className="task-main-headline">Рейтинг задания</h2>
          <span>
            <Rate />
            {/* {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''} */}
          </span>
        </div>
      </div>
    </>
  );
};

export default StandartTask;
