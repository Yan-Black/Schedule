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

const Settings: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [stage, setStage] = useState<string>('general-setting');
  const mergeState = useSelector((state: RootState) => state.settings.merge);
  const visualState = useSelector((state: RootState) => state.settings.visual);
  const colorsState = useSelector((state: RootState) => state.colors);
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
        event: eventValue.dataset.name,
        color: colorValue.dataset.color,
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

  const showSettings = () => {
    if (stage === 'general-setting') {
      return (
        <Modal
          className="settings__window"
          visible={visible}
          onOk={close}
          onCancel={close}
          closable={false}
          centered
          footer={
            <Button type="primary" onClick={close} block className="settings__control">
              <span className="setting__control-text">Ok</span>
            </Button>
          }
        >
          <form className="settings__options">
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
            <label className="settings__item" htmlFor="visiall">
              <span>
                <ZoomInOutlined className="settings__icon" />
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
            <label className="settings__item" htmlFor="merge">
              <span>
                <ShareAltOutlined className="settings__icon" />
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
              className="settings__item"
              role="button"
              tabIndex={0}
            >
              <p>
                <FormatPainterOutlined className="settings__icon" />
                Select color
              </p>
            </div>
          </form>
        </Modal>
      );
    }
    return (
      <Modal
        className="settings__window"
        visible={visible}
        onOk={() => setStage('general-setting')}
        onCancel={() => setStage('general-setting')}
        closable={false}
        footer={
          <Button type="primary" onClick={() => setStage('general-setting')} className="settings__control" block>
            <span className="setting__control-text">Ok</span>
          </Button>
        }
      >
        <form className="settings__options settings__colors">
          {Object.entries(eventTypes).map((item: string[], index: number) => {
            const [key, value] = item;
            const colorName: string = Object.values(colorsState)[index] as string;
            return (
              <div className="settings__option-color" key={value}>
                <p className="settings__color-description">{value}</p>
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
                  <span className={`settings__color-deafult ${colorName}`}>Hello</span>
                </div>
              </div>
            );
          })}
        </form>
      </Modal>
    );
  };
  return (
    <div className="settings">
      <Button type="primary" className="settings__button" onClick={showCustomizations} title="Settings">
        <SettingOutlined className="settings__button-icon" />
      </Button>
      {showSettings()}
    </div>
  );
};

export default Settings;
