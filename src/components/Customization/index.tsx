import * as React from 'react';
import { useState } from 'react';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';
import { FormatPainterOutlined, ZoomInOutlined, SettingOutlined, ShareAltOutlined } from '@ant-design/icons';
import Switch from 'react-switch';
import { changeSettings } from '../../reducers/settings';
import { changeEventColor } from '../../reducers/eventTypeColors';
import { backgrounds, eventTypes } from '../../constants';
import selectList from './list';
import './index.scss';

const Customization: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [stage, setStage] = useState<string>('general-setting');
  const mergeState = useSelector((state: RootState) => state.settings.merge);
  const visualState = useSelector((state: RootState) => state.settings.visual);

  const dispatch = useDispatch();

  const showCustomizations = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const close = () => setVisible(false);

  const handleChangeColor = (event: React.MouseEvent<HTMLSpanElement>) => {
    const eventValue = event.target as HTMLSpanElement;
    const colorValue = event.target as HTMLSpanElement;
    dispatch(
      changeEventColor({
        event: eventValue,
        color: colorValue,
      }),
    );
  };

  const handleSelectSettings = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentEvent: string | boolean = event.target.name;
    const currentValue: string | boolean = event.target.value;
    dispatch(changeSettings({ event: currentEvent, value: currentValue }));
  };

  const handleFocusKeyboard = (event: React.KeyboardEvent) => {
    event.preventDefault();
  };

  const settings = () => {
    if (stage === 'general-setting') {
      return (
        <Modal
          className="schedule-customizations__window"
          visible={visible}
          onOk={close}
          onCancel={close}
          closable={false}
        >
          <form className="schedule-customizations__options">
            {selectList.map((obj) => {
              const { title, name, options, icon } = obj;
              return (
                <label className="schedule-customizations__item" key={title}>
                  <span>
                    {icon()}
                    {title}
                  </span>
                  <select
                    className="schedule-customizations__option-type schedule-customizations__option-select"
                    onChange={handleSelectSettings}
                    name={name}
                  >
                    {options.map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </label>
              );
            })}
            <label className="schedule-customizations__item" htmlFor="visiall">
              <span>
                <ZoomInOutlined className="schedule-customizations__icon" />
                Version for the visually impaired
              </span>
              <Switch
                onChange={() => {
                  if (visualState) {
                    dispatch(changeSettings({ event: 'visual', value: false }));
                  } else {
                    dispatch(changeSettings({ event: 'visual', value: true }));
                  }
                }}
                checked={visualState}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={60}
                id="visiall"
              />
            </label>
            <label className="schedule-customizations__item" htmlFor="merge">
              <span>
                <ShareAltOutlined className="schedule-customizations__icon" />
                Merge schedule
              </span>
              <Switch
                onChange={() => {
                  if (!mergeState) {
                    dispatch(changeSettings({ event: 'merge', value: true }));
                  } else {
                    dispatch(changeSettings({ event: 'merge', value: false }));
                  }
                }}
                checked={mergeState}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={60}
                id="merge"
              />
            </label>
            <div
              onClick={() => setStage('color-setting')}
              onKeyDown={(event) => (event.key === 'Enter' ? setStage('color-setting') : null)}
              className="schedule-customizations__item"
              role="button"
              tabIndex={0}
            >
              <p>
                <FormatPainterOutlined className="schedule-customizations__icon" />
                Select color
              </p>
            </div>
          </form>
        </Modal>
      );
    }
    return (
      <Modal
        className="schedule-customizations__window"
        visible={visible}
        onOk={() => setStage('general-setting')}
        onCancel={() => setStage('general-setting')}
        closable={false}
      >
        <form className="schedule-customizations__options schedule-customizations__colors">
          {Object.entries(eventTypes).map((item) => {
            const [key, value] = item;
            return (
              <div className="schedule-customizations__option-color" key={value}>
                <p className="schedule-customizations__color-description">{value}</p>
                {backgrounds.map((classOfColor: string) => {
                  return (
                    <span
                      key={classOfColor}
                      role="button"
                      tabIndex={0}
                      aria-label="Mute volume"
                      className={`schedule-customizations__color-select ${classOfColor}`}
                      onClick={handleChangeColor}
                      onKeyDown={handleFocusKeyboard}
                      data-name={key}
                      data-color={classOfColor}
                    />
                  );
                })}
              </div>
            );
          })}
        </form>
      </Modal>
    );
  };
  return (
    <div className="schedule-customizations">
      <Button type="primary" className="schedule-customizations__button" onClick={showCustomizations} title="Settings">
        <span>Settings</span>
        <SettingOutlined className="schedule-customizations__button-icon" />
      </Button>
      {settings()}
    </div>
  );
};

export default Customization;
