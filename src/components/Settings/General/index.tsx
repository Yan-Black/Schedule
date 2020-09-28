import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-switch';
import {
  ZoomInOutlined,
  ShareAltOutlined,
  FormatPainterOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { RootState } from 'store';
import { setFont } from 'helpers';
import { changeSettings } from 'reducers/settings';
import { updateEventsTime } from 'reducers/events';
import { utcOffsets } from '@constants';
import selectList from '../list';

type Props = {
  setStage: React.Dispatch<React.SetStateAction<string>>;
};

const General: React.FC<Props> = ({ setStage }: Props) => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const currentRole: string = useSelector(
    (state: RootState) => state.role.currentRole,
  );
  const currentVisual = settings.visual;

  useEffect(() => {
    const settingsToJSON = JSON.stringify(settings);
    localStorage.setItem('settings', settingsToJSON);
  }, [settings]);

  const font = setFont(currentVisual);

  const handleSelectSettings = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const currentEvent: string | boolean = event.target.name;
    const currentValue: string | boolean = event.target.value;
    dispatch(changeSettings({ event: currentEvent, value: currentValue }));
    if (utcOffsets[currentValue]) {
      dispatch(updateEventsTime(utcOffsets[currentValue]));
    }
  };

  const optionalMentorSetting = () => {
    if (currentRole === 'Mentor') {
      return (
        <div
          onClick={() => setStage('columns-setting')}
          onKeyDown={(event) =>
            event.key === 'Enter' ? setStage('additional-columns') : null
          }
          className="settings__item"
          role="button"
          tabIndex={0}
        >
          <p>
            <UsergroupAddOutlined className="settings__icon" />
            Add customs columns
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <form className="settings__options" style={font}>
      {selectList.map((obj) => {
        const { title, name, options, icon } = obj;
        return (
          <label className="settings__item" key={title}>
            <span>
              {icon()}
              {title}
            </span>
            <select
              className="settings__option-type settings__option-select"
              style={font}
              onChange={handleSelectSettings}
              name={name}
              value={settings[name]}
            >
              {options.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        );
      })}
      <label className="settings__item" htmlFor="visiall">
        <span>
          <ZoomInOutlined className="settings__icon" />
          Version for the visually impaired
        </span>
        <Switch
          onChange={() => {
            if (settings.visual) {
              dispatch(changeSettings({ event: 'visual', value: false }));
            } else {
              dispatch(changeSettings({ event: 'visual', value: true }));
            }
          }}
          checked={settings.visual}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={60}
          id="visiall"
        />
      </label>
      <label className="settings__item" htmlFor="merge">
        <span>
          <ShareAltOutlined className="settings__icon" />
          Merge schedule
        </span>
        <Switch
          onChange={() => {
            if (!settings.merge) {
              dispatch(changeSettings({ event: 'merge', value: true }));
            } else {
              dispatch(changeSettings({ event: 'merge', value: false }));
            }
          }}
          checked={settings.merge}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={60}
          id="merge"
        />
      </label>
      <div
        onClick={() => setStage('color-setting')}
        onKeyDown={(event) =>
          event.key === 'Enter' ? setStage('color-setting') : null
        }
        className="settings__item"
        role="button"
        tabIndex={0}
      >
        <p>
          <FormatPainterOutlined className="settings__icon" />
          Select color
        </p>
      </div>
      {optionalMentorSetting()}
    </form>
  );
};

export default General;
