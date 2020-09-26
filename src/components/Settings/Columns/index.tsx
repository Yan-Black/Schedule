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

  const currentArray: string[] =
    localStorage.getItem('optionColumn') === null
      ? []
      : JSON.parse(localStorage.getItem('optionColumn'));

  const [columns, setColumns] = useState<Array<string>>(currentArray);
  const currentVisual = useSelector(
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
    const eventType = newColumn.toLowerCase().split(' ').join('');
    dispatch(
      changeColumnVisibility({
        event: eventType,
        checked: true,
        columnName: newColumn,
      }),
    );
  };

  const addColumn = () => {
    setColumns((prev: string[]) => [...prev, newColumn]);
    updateState();
    setNewColumn('');
  };

  const clickEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    setColumns((prev: string[]) => [...prev, newColumn]);
    updateState();
    setNewColumn('');
  };

  const removeColumn = (value: string) => {
    const array: string[] = columns.filter((item: string) => item !== value);
    const eventType: string = value.toLowerCase().split(' ').join('');
    dispatch(
      deleteColumnVisibility({
        event: eventType,
        checked: true,
        columnName: newColumn,
      }),
    );
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
        {columns.map((name: string, index: number) => {
          return (
            <Card
              title={`Option column № ${index + 1}`}
              style={font}
              key={`${index * 1}`}
              extra={<CloseOutlined onClick={() => removeColumn(name)} />}
            >
              {name}
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Columns;
