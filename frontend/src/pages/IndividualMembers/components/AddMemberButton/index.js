import React, { useState } from 'react';
import { Button, Popover, Menu } from 'antd';

const AddMemberButton = ({ onAddSingleMember, onAddFromExcel }) => {
    const [popoverVisible, setPopoverVisible] = useState(false);

    const handleVisibleChange = (visible) => {
        setPopoverVisible(visible);
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={()=>{
                setPopoverVisible(false);
                onAddSingleMember();
            }}>
                Thêm lẻ
            </Menu.Item>
            <Menu.Item key="2" onClick={()=>{
                setPopoverVisible(false);
                onAddFromExcel();
            }}>
                Thêm bằng file Excel
            </Menu.Item>
        </Menu>
    );

    return (
        <Popover
            content={menu}
            trigger="click"
            visible={popoverVisible}
            onVisibleChange={handleVisibleChange}
            placement="bottom"
        >
            <Button type="primary">
                Thêm hội viên
            </Button>
        </Popover>
    );
};

export default AddMemberButton;
