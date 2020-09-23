import * as React from 'react';
import { Input, InputNumber, Form } from 'antd';
import { useSelector } from 'react-redux';
import { setFont } from 'helpers';
import { RootState } from 'store';
import { EditableCellProps } from '../models';

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: EditableCellProps) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  const currentVersion = useSelector(
    (state: RootState) => state.settings.visual,
  );

  const font = setFont(currentVersion);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <td {...restProps} style={font}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
