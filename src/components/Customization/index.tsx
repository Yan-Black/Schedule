import * as React from 'react';
import { Modal, Button } from 'antd';
import {
    FormatPainterOutlined,
    ZoomInOutlined,
    ReadOutlined,
    SettingOutlined,
    FieldTimeOutlined,
    DownloadOutlined,
    TeamOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { GithubPicker } from 'react-color';
import Switch from 'react-switch';
import { timeZone, backgrounds, tasks } from '../../constants';
import './index.scss';

const Customization: React.FC = () => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [visual, setVisual] = React.useState<boolean>(false);
    const [mergeSchedule, setMergeSchedule] = React.useState<boolean>(false);
    const [stage, setStage] = React.useState<string>('general-setting');
    const [color, setColor] = React.useState<string>('000');
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
    const showIconTeam = (): JSX.Element => <TeamOutlined className="schedule-customizations__icon" />;
    const showIconDownload = (): JSX.Element => <DownloadOutlined className="schedule-customizations__icon" />;
    const showIconTimaZone = (): JSX.Element => <FieldTimeOutlined className="schedule-customizations__icon" />;
    const showIconView = (): JSX.Element => <ReadOutlined className="schedule-customizations__icon" />;
    const showIconVisual = (): JSX.Element => <ZoomInOutlined className="schedule-customizations__icon" />;
    const showIconAlt = (): JSX.Element => <ShareAltOutlined className="schedule-customizations__icon" />;
    const list = (title: string, array: Array<string>, callback: () => JSX.Element) => (
        <label className="schedule-customizations__item">
            <span>
                {callback()}
                {title}
            </span>
            <select className="schedule-customizations__option-type schedule-customizations__option-select">
                {array.map((value) => (
                    <option key={value}>{value}</option>
                ))}
            </select>
        </label>
    );
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
                        {list('Select view', ['List', 'Calendar'], showIconView)}
                        {list('Select timezone', timeZone, showIconTimaZone)}
                        {list('Select format', ['txt', 'pdf', 'csv'], showIconDownload)}
                        {list('Select format meeting', ['Online and offline', 'Online', 'Offline'], showIconTeam)}
                        <label className="schedule-customizations__item">
                            <span>
                                {showIconVisual()}
                                Version for the visually impaired
                            </span>
                            <Switch
                                onChange={(checked) => setVisual(checked)}
                                checked={visual}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                height={20}
                                width={60}
                            />
                        </label>
                        <label className="schedule-customizations__item">
                            <span>
                                {showIconAlt()}
                                Merge schedule
                            </span>
                            <Switch
                                onChange={(checked) => setMergeSchedule(checked)}
                                checked={mergeSchedule}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                height={20}
                                width={60}
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
                            <GithubPicker
                                color={color}
                                onChangeComplete={handleChangeColor}
                                colors={backgrounds}
                                width="200px"
                            />
                        </div>
                    ))}
                </form>
            </Modal>
        );
    };
    return (
        <div className="schedule-customizations">
            <Button
                type="primary"
                className="schedule-customizations__button"
                onClick={showCustomizations}
                title="Settings"
            >
                <span>Settings</span>
                <SettingOutlined className="schedule-customizations__button-icon" />
            </Button>
            {settings()}
        </div>
    );
};

export default Customization;
