import store from 'store';
import jsPDF from './jsPDF';

interface DataI {
  [key: string]: string;
}

const downloadDocument = (format: string): void => {
  const downloadPDF = (text) => {
    const doc = jsPDF();
    console.log(text);

    doc.setFontSize(8);
    doc.text(10, 15, text);
    //  doc.save('Schedule.pdf');
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
      schedule =
        '<table><tr><td width="184">a</td><td>s</td><td>d</td></tr></table>';
      download(schedule);
      break;
    case 'pdf':
      schedule = workableArray
        .map((e: DataI) => {
          return `${e.dateTime}\n    ${e.name}\n    ${e.description}\n    ${e.descriptionUrl}\n    ${e.type}\n    ${e.eventTime} MSK`;
        })
        .join('\n\n');
      downloadPDF('a'.charCodeAt(0));
      break;
    default:
      schedule = null;
  }
};
// function toUTF16(text) {
//   const byteArray = new Uint8Array(text.length * 2);
//   for (let i = 0; i < text.length; i++) {
//     byteArray[i * 2] = text.charCodeAt(i); // & 0xff;
//   }
//   куегкт;
// }
export default downloadDocument;
