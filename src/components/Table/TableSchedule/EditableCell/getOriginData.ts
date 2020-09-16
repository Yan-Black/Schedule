import { StudyEvent } from 'reducers/events/models';
import { ScheduleData } from '../models';

const getOriginData = (events: StudyEvent[], ind: number): ScheduleData[] => {
  const originData: ScheduleData[] = [];
  for (let i = 0; i < events.length; i++) {
    if (events[i].week === ind.toString()) {
      let time = '';
      switch (events[i].type) {
        case 'Task deadline':
        case 'Optional task deadline':
        case 'Cross-check deadline':
          time = '23:59';
          break;
        default:
          time = '00:00';
          break;
      }
      originData.push({
        key: i,
        startDay: events[i].dateTime,
        startTime: events[i].eventTime !== '' ? events[i].eventTime : time,
        name: events[i].name,
        place: events[i].place || '-',
        materials: events[i].descriptionUrl,
        description: events[i].description,
        comments: events[i].comment || '-',
        type: events[i].type,
        id: events[i].id,
        lector: events[i].lector || ('Some lector' as string),
      });
    }
  }
  return originData;
};

export default getOriginData;
