import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backgrounds, eventTypes } from '@constants';
import { RootState } from 'store';
import { setFont } from 'helpers';
import { changeEventColor } from 'reducers/eventTypeColors';

const Colors: React.FC = () => {
  const dispatch = useDispatch();
  const colorsState = useSelector((state: RootState) => state.colors);
  const currentVisual = useSelector(
    (state: RootState) => state.settings.visual,
  );

  useEffect(() => {
    const colorsToJSON = JSON.stringify(colorsState);
    localStorage.setItem('colors', colorsToJSON);
  }, [colorsState]);

  const font = setFont(currentVisual);

  const handleChangeColor = (event: React.MouseEvent<HTMLSpanElement>) => {
    const eventValue = event.target as HTMLSpanElement;
    const colorValue = event.target as HTMLSpanElement;
    dispatch(
      changeEventColor({
        event: eventValue.dataset.name,
        color: colorValue.dataset.color,
      }),
    );
  };

  const handleFocusKeyboard = (event: React.KeyboardEvent) => {
    event.preventDefault();
  };

  return (
    <form className="settings__options settings__colors">
      {Object.entries(eventTypes).map((item: string[], index: number) => {
        const [key, value] = item;
        const colorName: string = Object.values(colorsState)[index] as string;
        return (
          <div className="settings__option-color" key={value}>
            <p className="settings__color-description" style={font}>
              {value}
            </p>
            <div className="settings__colors-wrapper">
              <div className="settings__color-option">
                {backgrounds.map((classOfColor: string) => {
                  return (
                    <span
                      key={classOfColor}
                      role="button"
                      tabIndex={0}
                      aria-label="Mute volume"
                      className={`settings__color-select ${classOfColor}`}
                      onClick={handleChangeColor}
                      onKeyDown={handleFocusKeyboard}
                      data-name={key}
                      data-color={classOfColor}
                    />
                  );
                })}
              </div>
              <span
                className={`settings__color-deafult ${colorName}`}
                style={font}
              >
                Hello
              </span>
            </div>
          </div>
        );
      })}
    </form>
  );
};

export default Colors;
