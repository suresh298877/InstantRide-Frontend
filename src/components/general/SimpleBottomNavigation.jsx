import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

export default function SimpleBottomNavigation({ setTab }) {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        setTab(value)
    }, [value])

    return (

        <BottomNavigation
            className='fixed bottom-0 container mx-auto '
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Tickets" icon={<ConfirmationNumberRoundedIcon />} />
            <BottomNavigationAction label="Add Ticket" icon={<AddBoxRoundedIcon />} />
            <BottomNavigationAction label="My Tickets" icon={<LocalActivityIcon />} />
        </BottomNavigation>
    );
}
