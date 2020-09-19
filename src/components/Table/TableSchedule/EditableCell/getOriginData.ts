import { StudyEvent } from 'reducers/events/models';
import { Organizer } from 'reducers/organizers/models';
import { ScheduleData } from '../models';

const getDate = (originDate: ScheduleData): string => {
  const date = originDate.startDay.split(' ')[1].split('.');
  const day = date[0];
  const month = date[1];
  const year = date[2];
  const dateString = `${day}/${month}/${year}`;
  return dateString;
};

const getTime = (event: ScheduleData | StudyEvent): string => {
  let time = '';
  const eventSc = event as ScheduleData;
  const eventSt = event as StudyEvent;
  switch (event.type) {
    case 'Task deadline':
    case 'Optional task deadline':
    case 'Cross-check deadline':
      time = '23:59';
      break;
    default:
      time = '00:00';
      break;
  }
  return eventSc.startTime || eventSt.eventTime || time;
};

const getOriginData = (
  events: StudyEvent[],
  organizers: Organizer[],
  ind: number,
): ScheduleData[] => {
  const originData: ScheduleData[] = [];
  for (let i = 0; i < events.length; i++) {
    if (events[i].week === ind.toString()) {
      const time = getTime(events[i]);
      const lectorData = organizers.filter(
        (organizer) => organizer.id === events[i].organizerId,
      );
      const lector = lectorData.length > 0 ? lectorData[0].name : null;
      originData.push({
        key: i,
        startDay: events[i].dateTime,
        startTime: time,
        name: events[i].name || '-',
        place: events[i].place || '-',
        materials: events[i].descriptionUrl || '-',
        description: events[i].description || '-',
        comments: events[i].comment || '-',
        type: events[i].type,
        id: events[i].id,
        lector,
        week: events[i].week,
        additional1: events[i].additional1,
        additional2: events[i].additional2,
        additional3: events[i].additional3,
      });
    }
  }
  return originData;
};

export default getOriginData;
export { getDate, getTime };
