import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, Modal } from 'antd';
import { globalFunctions } from '../../@constants';

const ModalWindow: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('basic');
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const showModalWindow = (windowType) => {
    setType(windowType);
    setVisible(true);
  };

  useEffect(() => {
    globalFunctions.showModalWindow = showModalWindow;
  }, []);
  const currentModalWindow = (windowType: string) => {
    switch (windowType) {
      case 'download':
        return (
          <Modal
            title="Download Schedule"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Download logic</p>
          </Modal>
        );

      default:
        return (
          <Modal
            title="Error"
            visible={visible}
            onOk={handleOk}
            cancelText=""
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
                Ok
              </Button>,
            ]}
          >
            <p>Запрашиваемого модального окна не существует.</p>
          </Modal>
        );
    }
  };
  // useEffect(() => {});
  return <>{currentModalWindow(type)}</>;
};

export default ModalWindow;
