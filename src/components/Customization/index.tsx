import * as React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import { FormatPainterOutlined, ZoomInOutlined, SettingOutlined, ShareAltOutlined } from '@ant-design/icons';
import { GithubPicker } from 'react-color';
import Switch from 'react-switch';
import { backgrounds, tasks } from '../../constants';
import selectList from './list';
import './index.scss';

const Customization: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visual, setVisual] = useState<boolean>(false);
  const [mergeSchedule, setMergeSchedule] = useState<boolean>(false);
  const [stage, setStage] = useState<string>('general-setting');
  const [color, setColor] = useState<string>('000');
  const showCustomizations = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  const close = () => setVisible(false);
  const handleChangeColor = (value: { hex: string }) => {
    setColor(value.hex);
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
              const { title, options, icon } = obj;
              return (
                <label className="schedule-customizations__item" key={title}>
                  <span>
                    {icon()}
                    {title}
                  </span>
                  <select className="schedule-customizations__option-type schedule-customizations__option-select">
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
                onChange={(checked) => setVisual(checked)}
                checked={visual}
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
                onChange={(checked) => setMergeSchedule(checked)}
                checked={mergeSchedule}
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
          {tasks.map((task) => (
            <div className="schedule-customizations__option-color" key={task}>
              <p className="schedule-customizations__color-description">{task}</p>
              <GithubPicker color={color} onChangeComplete={handleChangeColor} colors={backgrounds} width="225px" />
            </div>
          ))}
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
