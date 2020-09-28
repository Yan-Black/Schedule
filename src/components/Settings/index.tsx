import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { RootState } from 'store';
import { setFont } from 'helpers';
import General from './General';
import Colors from './Colors';
import Columns from './Columns';
import './index.scss';

const Settings: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [stage, setStage] = useState<string>('general-setting');
  const currentVisual: boolean = useSelector(
    (state: RootState) => state.settings.visual,
  );

  const font = setFont(currentVisual);

  const showCustomizations = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const setControl = () => {
    if (stage === 'general-setting') {
      setVisible(false);
    } else {
      setStage('general-setting');
    }
  };

  const showSettings = () => {
    switch (stage) {
      case 'general-setting':
        return <General setStage={setStage} />;
      case 'color-setting':
        return <Colors />;
      default:
        return <Columns />;
    }
  };

  return (
    <div className="settings">
      <Button
        type="primary"
        className="settings__button"
        onClick={showCustomizations}
        title="Settings"
      >
        <SettingOutlined className="settings__button-icon" />
      </Button>
      <Modal
        className="settings__window"
        visible={visible}
        onOk={setControl}
        onCancel={setControl}
        closable={false}
        footer={
          <Button
            type="primary"
            onClick={setControl}
            className="settings__control"
            block
          >
            <span className="setting__control-text" style={font}>
              Ok
            </span>
          </Button>
        }
      >
        {showSettings()}
      </Modal>
    </div>
  );
};

export default Settings;
