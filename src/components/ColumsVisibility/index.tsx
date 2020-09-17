import * as React from 'react';
import { useEffect } from 'react';
import { Menu, Dropdown, Button, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { changeColumnVisibility } from '../../reducers/columnVisibility';
import { columns } from '../../constants';
import './index.scss';
import { TableColumn } from '../../reducers/columnVisibility/models';

const ColumnsVisibility: React.FC = () => {
  const dispatch = useDispatch();
  const columnState: TableColumn = useSelector((state: RootState) => state.column);

  useEffect(() => {
    const columnsToJSON = JSON.stringify(columnState);
    localStorage.setItem('columns', columnsToJSON);
  }, [columnState]);

  const onChange = (event: CheckboxChangeEvent) => {
    dispatch(changeColumnVisibility({ event: event.target.name, status: event.target.checked }));
  };

  const menu = (
    <Menu>
      {Object.entries(columns).map((item, index) => {
        const [event, value] = item;
        return (
          <Menu.Item key={`${index * 1}`}>
            <Checkbox defaultChecked={columnState[event]} name={event} onChange={onChange}>
              {value}
            </Checkbox>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu}>
        <Button className="columns-visibility__button">
          <span className="columns-visibility__title">Columns</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ColumnsVisibility;
