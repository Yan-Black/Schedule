import * as React from 'react';
import { Table, Form } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { getKeyByValue, setFont } from 'helpers';
import { useState } from 'react';
import { TableColumn } from 'reducers/columnVisibility/models';
import { eventTypes } from '@constants';
import { mentorRole, operationColKey } from '@constants/_tableConstants';
import getOriginData from '../EditableCell/getOriginData';
import EditableCell from '../EditableCell';
import sortEvents from './sortEvents';
import tableColumns from './tableColumns';
import AddButton from '../AddButton';
import HideButton from '../HideButton';
import ShowButton from '../ShowButton';

const expandedRow = (ind: number, windowSize: number): JSX.Element => {
  const columnVisibility: TableColumn = useSelector(
    (state: RootState) => state.column,
  );
  const { currentRole } = useSelector((state: RootState) => state.role);
  const eventTypeColors = useSelector((state: RootState) => state.colors);
  const events = useSelector((state: RootState) => state.events.data);
  const organizers = useSelector((state: RootState) => state.organizers.data);
  const originData = getOriginData(events, organizers, ind);
  const sortedData = originData.slice().sort(sortEvents);
  const { mergedColumns, form } = tableColumns(events, sortedData, windowSize);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [hiddenRowKeys, setHiddenRowKeys] = useState([]);
  const currentVersion = useSelector(
    (state: RootState) => state.settings.visual,
  );

  const onSelectChange = (selectedRows: number[]) => {
    setSelectedRowKeys(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 30,
    fixed: true,
  };

  const filteredColumns = [];
  mergedColumns.map((col) => {
    if (
      columnVisibility[col.key] &&
      columnVisibility[col.key].status &&
      currentRole === mentorRole
    )
      filteredColumns.push(col);
    else if (
      columnVisibility[col.key] &&
      columnVisibility[col.key].status &&
      col.key !== operationColKey
    )
      filteredColumns.push(col);
    return col;
  });
  const font = setFont(currentVersion);
  return (
    <>
      {sortedData.length > 0 && (
        <>
          <div className="table-btns-wrapper">
            <div className="hide-show-btns">
              <HideButton
                selectedRowKeys={selectedRowKeys}
                setHiddenRowKeys={setHiddenRowKeys}
                fontSize={font.fontSize}
              />
              <ShowButton
                hiddenRowKeys={hiddenRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                setHiddenRowKeys={setHiddenRowKeys}
                fontSize={font.fontSize}
              />
            </div>
            {currentRole === mentorRole && (
              <AddButton
                sortedData={sortedData}
                events={events}
                ind={ind}
                fontSize={font.fontSize}
              />
            )}
          </div>
          <Form
            form={form}
            component={false}
            size={windowSize > 600 ? 'middle' : 'small'}
          >
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
              scroll={{ y: 1500 }}
              sticky
              style={font}
              rowClassName={(record) => {
                const type = getKeyByValue(eventTypes, record.type);
                const rowClass = `${eventTypeColors[type] as string}`;
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
