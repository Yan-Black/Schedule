import { EditTwoTone } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { getDate, getTime } from '../EditableCell/getOriginData';
import { EditButtonProps, ScheduleData } from '../models';

const EditButton = ({
  recordData,
  setEditingKey,
  organizers,
  form,
}: EditButtonProps): JSX.Element => {
  const edit = (record: ScheduleData) => {
    const lectorData = !record
      ? []
      : organizers.filter((organizer) => organizer.id === record.lector);
    const lector = lectorData.length > 0 ? lectorData[0].name : null;
    form.setFieldsValue({
      date: moment(getDate(record), 'DD:MM:YYYY'),
      time: moment(getTime(record), 'HH:mm'),
      name: record.name,
      type: record.type,
      place: record.place,
      week: '5',
      materials: record.materials,
      description: record.description,
      lector,
      comments: record.comments,
      additional1: record.additional1,
      additional2: record.additional2,
      additional3: record.additional3,
      ...record,
    });
    setEditingKey(record.key.toString());
  };

  return (
    <Tooltip title="Edit">
      <Button
        type="dashed"
        icon={<EditTwoTone />}
        onClick={() => edit(recordData)}
      />
    </Tooltip>
  );
};

export default EditButton;
