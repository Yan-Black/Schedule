import store from 'store';

interface DataI {
  [key: string]: string;
}

const downloadDocument = (format: string): void => {
  const download = (text) => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      `data:text/${format};charset=utf-8,${encodeURIComponent(text)}`,
    );
    element.setAttribute('download', `Schedule.${format}`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  let schedule;

  const { data } = store.getState().events;
  const workableArray = [];
  data.forEach((e) => {
    workableArray.push(e);
  });
  workableArray.sort((a: DataI, b: DataI) => {
    const dateA = Date.parse(
      a.dateTime.slice(5).split('.').reverse().join('-'),
    );
    const dateB = Date.parse(
      b.dateTime.slice(5).split('.').reverse().join('-'),
    );
    if (dateA > dateB) {
      return 1;
    }
    if (dateA < dateB) {
      return -1;
    }
    return 0;
  });

  switch (format) {
    case 'txt':
      schedule = workableArray
        .map((e: DataI) => {
          return `${e.dateTime}\n    ${e.name}\n    ${e.description}\n    ${e.descriptionUrl}\n    ${e.type}\n    ${e.eventTime} MSK`;
        })
        .join('\n\n');

      break;
    case 'cvs':
      schedule = 'cvs format';
      break;
    default:
      schedule = 'null';
  }

  download(schedule);
};

export default downloadDocument;
