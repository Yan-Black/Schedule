import * as React from 'react';

export const generatePanelHader = (
  currentIdx: number,
  dateTime: string,
  i: number,
): JSX.Element => (
  <h4 style={{ color: `${currentIdx > i ? 'lightgray' : 'black'}` }}>
    {dateTime}
  </h4>
);

export const abc = 'abc';
