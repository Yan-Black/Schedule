import * as React from 'react';
import { Button, Table, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getKeyByValue } from 'helpers';
import { useState } from 'react';
import { addEvent } from 'reducers/events';
import { TableColumn } from 'reducers/columnVisibility/models';
import { eventTypes } from '@constants';
import getOriginData, { midnight } from '../EditableCell/getOriginData';
import EditableCell from '../EditableCell';
import sortEvents from './sortEvents';
import tableColumns from './tableColumns';

const expandedRow = (ind: number): JSX.Element => {
  const dispatch = useDispatch();

  const columnVisibility: TableColumn = useSelector(
    (state: RootState) => state.column,
  );
  const { currentRole } = useSelector((state: RootState) => state.role);
  const eventTypeColors = useSelector((state: RootState) => state.colors);
  const events = useSelector((state: RootState) => state.events.data);
  const organizers = useSelector((state: RootState) => state.organizers.data);
  const originData = getOriginData(events, organizers, ind);
  const sortedData = originData.slice().sort(sortEvents);
  const { mergedColumns, form } = tableColumns(events, sortedData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [hiddenRowKeys, setHiddenRowKeys] = useState([]);

  const onSelectChange = (selectedRows: number[]) => {
    setSelectedRowKeys(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 30,
  };

  const hideHandler = () => setHiddenRowKeys(selectedRowKeys);
  const showHandler = () => {
    setSelectedRowKeys([]);
    setHiddenRowKeys([]);
  };

  const add = () => {
    const newItem = {
      dateTime:
        sortedData.length > 0
          ? sortedData[0].startDay
          : events[events.length - 1].dateTime,
      eventTime: midnight,
      type: 'no type',
      week: sortedData.length > 0 ? sortedData[0].week : ind,
    };
    dispatch(addEvent(newItem));
  };

  const filteredColumns = [];
  mergedColumns.map((col) => {
    if (columnVisibility[col.key] && currentRole === 'Mentor')
      filteredColumns.push(col);
    else if (columnVisibility[col.key] && col.key !== 'operation')
      filteredColumns.push(col);
    return col;
  });

  return (
    <>
      {sortedData.length > 0 && (
        <>
          <div className="table-btns-wrapper">
            <div className="hide-show-btns">
              <Button
                className="hide-btn"
                type="primary"
                disabled={selectedRowKeys.length === 0}
                onClick={hideHandler}
              >
                Hide
              </Button>
              <Button
                type="primary"
                disabled={hiddenRowKeys.length === 0}
                onClick={showHandler}
              >
                Show
              </Button>
            </div>
            {currentRole === 'Mentor' && (
              <Button type="primary" onClick={add}>
                Add event
              </Button>
            )}
          </div>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              columns={filteredColumns}
              pagination={false}
              dataSource={sortedData}
              rowSelection={rowSelection}
              scroll={{ y: 400 }}
              rowClassName={(record) => {
                const type = getKeyByValue(eventTypes, record.type);
                const rowClass = eventTypeColors[type] as string;
                return hiddenRowKeys.includes(record.key)
                  ? 'disable'
                  : rowClass;
              }}
            />
          </Form>
        </>
      )}
    </>
  );
};

export default expandedRow;
