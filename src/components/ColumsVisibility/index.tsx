import * as React from 'react';
import { useEffect } from 'react';
import { Menu, Dropdown, Button, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { columns, permanentColumns } from '@constants';
import { changeColumnVisibility } from 'reducers/columnVisibility';
import { setFont } from 'helpers';
import './index.scss';

const ColumnsVisibility: React.FC = () => {
  const dispatch = useDispatch();
  const columnState = useSelector((state: RootState) => state.column);
  const currentVersion = useSelector(
    (state: RootState) => state.settings.visual,
  );

  useEffect(() => {
    const columnsToJSON = JSON.stringify(columnState);
    localStorage.setItem('columns', columnsToJSON);
  }, [columnState]);

  const onChange = (event: CheckboxChangeEvent) => {
    dispatch(
      changeColumnVisibility({
        event: event.target.name,
        status: event.target.checked,
      }),
    );
  };

  const disableColumn = (name: string) => {
    return !!permanentColumns.includes(name);
  };

  const menu = (
    <Menu>
      {Object.entries(columns).map((item, index) => {
        const [event, value] = item;
        const font = setFont(currentVersion);
        return (
          <Menu.Item key={`${index * 1}`}>
            <Checkbox
              defaultChecked={columnState[event] as boolean}
              name={event}
              onChange={onChange}
              disabled={disableColumn(value)}
              style={font}
            >
              {value}
            </Checkbox>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  const font = setFont(currentVersion);
  return (
    <div>
      <Dropdown overlay={menu}>
        <Button className="columns-visibility__button" style={font}>
          <span className="columns-visibility__title">Columns</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ColumnsVisibility;
