import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function ResponsiveDateTimePickers() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
        </LocalizationProvider>
    );
}
