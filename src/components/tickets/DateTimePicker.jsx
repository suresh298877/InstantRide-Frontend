import React from 'react';
import { DatePicker, Space } from 'antd';
const onOk = (value) => {
    console.log('onOk: ', value);
};
const DateTimePicker = ({ name, id }) => (
    <Space direction="vertical" size={12}>
        <DatePicker
            id={id}
            required
            showTime
            name={name}
            onChange={(value, dateString) => {
                console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOk}
        />
    </Space>
);
export default DateTimePicker;