import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

import { RootState } from 'store';
import { globalFunctions } from '../../@constants';

import './index.scss';

const ModalWindow: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.data);
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

  const items = events.filter((item) => item.favourite === true);

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

      case 'favourite':
        return (
          <Modal
            title="Favourites"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ul>
              {items.map((fav) => {
                return (
                  <li
                    key={fav.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'left',
                      border: '1px solid lightgrey',
                      borderRadius: '5px',
                      marginBottom: '5px',
                      padding: '10px',
                    }}
                  >
                    <span style={{ color: 'green' }}>{fav.dateTime}</span>
                    &nbsp;
                    <span>{fav.eventTime}</span>&nbsp;
                    <span style={{ fontWeight: 'bold' }}>
                      {fav.description}
                    </span>
                    <CloseOutlined
                      style={{ marginLeft: 'auto', cursor: 'pointer' }}
                    />
                  </li>
                );
              })}
            </ul>
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
            <p>Ooops! An error occurred! Try again later.</p>
          </Modal>
        );
    }
  };
  return <>{currentModalWindow(type)}</>;
};

export default ModalWindow;
