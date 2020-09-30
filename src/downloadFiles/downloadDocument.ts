import store from 'store';
import jsPDF from './jsPDF';
import translite from './translite';

interface DataI {
  [key: string]: string;
}

const downloadDocument = (format: string): void => {
  const downloadPDF = (textArr) => {
    const doc = jsPDF();
    doc.setFontSize(8);
    let pull: [string];
    const count = textArr.length / 12;
    for (let i = 0; i <= count; i++) {
      pull = textArr.splice(0, 12);
      doc.text(10, 15, pull.join('\n\n'));
      doc.addPage();
    }
    doc.save('Schedule.pdf');
  };
  const download = (text) => {
    const element = document.createElement('a');
    element.download = `Schedule.${format}`;
    const type = {
      type: format === 'txt' ? 'text/txt' : 'data:application/vnd.sealed.xls',
    };
    const myBlob = new Blob([text], type);
    const blobURL = (window.URL || window.webkitURL).createObjectURL(myBlob);
    element.href = blobURL;
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
      download(schedule);
      break;
    case 'xls':
      schedule = workableArray
        .map((e: DataI) => {
          return `<tr><td>${e.dateTime}</td><td>${e.name}</td><td>${translite(
            e.description,
          )}</td><td>${e.descriptionUrl}</td><td>${e.type}</td><td>${
            e.eventTime
          }</td></tr>`;
        })
        .join('\n\n');
      download(`<table>${schedule}</table>`);
      break;
    case 'pdf':
      schedule = workableArray.map((e: DataI) => {
        return `${e.dateTime}\n    ${e.name}\n    ${translite(
          e.description,
        )}\n    ${e.descriptionUrl}\n    ${e.type}\n    ${e.eventTime} MSK`;
      });
      downloadPDF(schedule);
      break;
    default:
      schedule = null;
  }
};

export default downloadDocument;
