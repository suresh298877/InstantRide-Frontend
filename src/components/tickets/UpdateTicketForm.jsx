import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TrainSearch from './TrainSearchInput';
import DepartureStationInput from './DepartureStationInput';
import ArrivalStationInput from './ArrivalStationInput';
import DateTimePicker from './DateTimePicker';
import ResponsiveDateTimePickers from './DateTimePicker2';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
export default function UpdateTicketForm({ id }) {
    const [open, setOpen] = React.useState(false);
    const [ticket, setTicket] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const user_id = jwtDecode(access_token).user_id
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/tickets/list-create-tickets/?user_id=${user_id}&ticket_id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                setTicket(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Edit Details
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    sx: { width: '90vw' },
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Edit Details</DialogTitle>
                <DialogContent>
                    <div className='mt-7'>
                        <TrainSearch data={ticket} />
                    </div>
                    <DepartureStationInput data={ticket} />
                    <ArrivalStationInput data={ticket} />
                    <div className='text-center my-3' style={{ zIndex: 3 }}>
                        <p>Departure Time</p>
                        <ResponsiveDateTimePickers />
                    </div>
                    <div className='text-center my-3' style={{ zIndex: 3 }}>
                        <p>Arrival Time</p>
                        <ResponsiveDateTimePickers />
                    </div>
                    <div className='text-center'>
                        <TextField name="price" value={ticket.price} style={{ marginTop: "5%", }} id="price" label="Price" variant="outlined" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
