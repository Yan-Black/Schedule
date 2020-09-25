import * as React from 'react';
import { useEffect } from 'react';
import { Menu, Dropdown, Button, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { permanentColumns } from '@constants';
import { changeColumnVisibility } from 'reducers/columnVisibility';
import { TableColumn } from 'reducers/columnVisibility/models';
import { setFont } from 'helpers';
import './index.scss';

const ColumnsVisibility: React.FC = () => {
  const dispatch = useDispatch();
  const columnState: TableColumn = useSelector(
    (state: RootState) => state.column,
  );
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
        checked: event.target.checked,
        columnName: event.target.value,
      }),
    );
  };

  const disableColumn = (name: string) => {
    return !!permanentColumns.includes(name);
  };

  const menu = (
    <Menu>
      {Object.entries(columnState).map(
        (objects: [string, { status: boolean; name: string }]) => {
          const [action, column] = objects;
          const font = setFont(currentVersion);
          return (
            <Menu.Item key={`${action}`} style={font}>
              <Checkbox
                defaultChecked={column.status}
                name={action}
                value={column.name}
                onChange={onChange}
                disabled={disableColumn(column.name)}
                style={font}
              />
              {column.name}
            </Menu.Item>
          );
        },
      )}
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
