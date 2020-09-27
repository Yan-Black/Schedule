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
      <div className="task-desc-container">
        <div className="task-desc-nav">
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
              <Menu.Item key="1">
                <a href="#deadline">Дата сдачи</a>
              </Menu.Item>
              <Menu.Item key="2">
                <a href="#goals">Цели задания</a>
              </Menu.Item>
              <Menu.Item key="3">
                <a href="#app-features">Особенности приложения</a>
              </Menu.Item>
              <Menu.Item key="4">
                <a href="#task-features">Особенности задания</a>
              </Menu.Item>
              <Menu.Item key="5">
                <a href="#demo">Демо</a>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<AppstoreOutlined />}
              title="Подбробности"
            >
              <Menu.Item key="6">
                <a href="#app-description">Описание приложения</a>
              </Menu.Item>
              <Menu.Item key="7">
                <a href="#repository-requirements">Требования к репозиторию</a>
              </Menu.Item>
              <Menu.Item key="8">
                <a href="#requirements">Технические требования</a>
              </Menu.Item>
              <Menu.Item key="9">
                <a href="#criteria">Критерии оценки</a>
              </Menu.Item>
              <Menu.Item key="10">
                <a href="#submit">Проверка задания</a>
              </Menu.Item>
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
              <Menu.Item key="11">
                <a href="#useful-links">Полезные ссылки</a>
              </Menu.Item>
              <Menu.Item key="12">
                <a href="#useful-links">Документ для вопросов</a>
              </Menu.Item>
              <Menu.Item key="13">
                <a href="#useful-links">Cross-check</a>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="task-desc-area">
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
            id="deadline"
          />
          <h3 className="task-add-headline" id="goals">
            Цели задания
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h3 className="task-add-headline" id="app-features">
            Особенности приложения
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h3 className="task-add-headline" id="task-features">
            Особенности задания
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <h3 className="task-add-headline" id="demo">
            Демо
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </p>
          <Collapse accordion>
            <Panel header="Описание приложения" key="1" id="app-description">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
            <Panel
              header="Требования к репозиторию"
              key="2"
              id="repository-requirements"
            >
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
            <Panel header="Технические требования" key="3" id="requirements">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
            <Panel header="Критерии оценки" key="4" id="criteria">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
            <Panel header="Проверка задания" key="5" id="submit">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>
            </Panel>
          </Collapse>
          <h2 className="task-main-headline" id="useful-links">
            Дополнительные материалы
          </h2>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Полезные ссылки" key="1">
              <ol>
                <li>1. Donec vitae sapien</li>
                <li>2. Etiam sit amet</li>
                <li>3. Sed fringilla fraucibus reture mauris</li>
              </ol>
            </TabPane>
            <TabPane tab="Документ для вопросов" key="2">
              <ol>
                <li>1. Donec vitae sapien</li>
                <li>2. Etiam sit amet</li>
                <li>3. Sed fringilla fraucibus reture mauris</li>
              </ol>
            </TabPane>
            <TabPane tab="Cross-check" key="3">
              <ol>
                <li>1. Donec vitae sapien</li>
                <li>2. Etiam sit amet</li>
                <li>3. Sed fringilla fraucibus reture mauris</li>
              </ol>
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
