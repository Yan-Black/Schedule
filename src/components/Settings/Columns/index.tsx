import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeColumnVisibility,
  deleteColumnVisibility,
} from 'reducers/columnVisibility';
import { Input, Button, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { setFont } from 'helpers';
import { RootState } from 'store';

const Columns: React.FC = () => {
  const [newColumn, setNewColumn] = useState<string>('');
  type ColumnsList = {
    name: string;
    event: string;
  };
  const currentArray: ColumnsList[] =
    localStorage.getItem('optionColumn') === null
      ? []
      : JSON.parse(localStorage.getItem('optionColumn'));

  const [columns, setColumns] = useState<Array<ColumnsList>>(currentArray);
  const [names, setNames] = useState<Array<string>>([
    'additional1',
    'additional2',
    'additional3',
  ]);

  const currentVisual: boolean = useSelector(
    (state: RootState) => state.settings.visual,
  );
  const dispatch = useDispatch();

  const setInputValue: (event) => void = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewColumn(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem('optionColumn', JSON.stringify(columns));
  }, [columns]);

  const updateState = () => {
    dispatch(
      changeColumnVisibility({
        event: names[names.length - 1],
        checked: true,
        columnName: newColumn,
      }),
    );
  };

  const addColumn = () => {
    const lastName: string = names[names.length - 1];
    setColumns((prev: ColumnsList[]) => [
      ...prev,
      { name: newColumn, event: lastName },
    ]);
    updateState();
    const newValue: string[] = names.filter(
      (item: string) => item !== lastName,
    );
    setNames(newValue);
    setNewColumn('');
  };

  const clickEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const lastName: string = names[names.length - 1];
    setColumns((prev: ColumnsList[]) => [
      ...prev,
      { name: newColumn, event: lastName },
    ]);
    updateState();
    const newValue: string[] = names.filter(
      (item: string) => item !== lastName,
    );
    setNames(newValue);
    setNewColumn('');
  };

  const removeColumn = (value: string) => {
    const array: ColumnsList[] = columns.filter(
      (item: ColumnsList) => item.event !== value,
    );
    dispatch(
      deleteColumnVisibility({
        event: value,
        checked: true,
        columnName: newColumn,
      }),
    );
    setNames((prev) => [...prev, value]);
    setColumns(array);
  };
  const font = setFont(currentVisual);

  const showInput: () => JSX.Element = () => {
    if (columns.length < 3) {
      return (
        <>
          <Input
            onChange={setInputValue}
            value={newColumn}
            placeholder="Name for column"
            onPressEnter={clickEnter}
            style={font}
          />
          <Button type="primary" onClick={addColumn} style={font}>
            Add column
          </Button>
        </>
      );
    }
    return <p>Maximum 3 optional columns</p>;
  };

  return (
    <>
      <form className="settings__options-column">{showInput()}</form>
      <div>
        {columns.map((item: ColumnsList, index: number) => {
          return (
            <Card
              title={`Option column № ${index + 1}`}
              style={font}
              key={`${index * 1}`}
              extra={<CloseOutlined onClick={() => removeColumn(item.event)} />}
            >
              {item.name}
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Columns;
