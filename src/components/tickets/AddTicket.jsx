import { Form, Navigate, useActionData } from "react-router-dom";
import TrainSearchInput from "./TrainSearchInput";
import Button from '@mui/material/Button';
import DepartureStationInput from "./DepartureStationInput";
import ArrivalStationInput from "./ArrivalStationInput";
import DateTimePicker from "./DateTimePicker";
import { jwtDecode } from "jwt-decode";
import { TextField } from "@mui/material";
import axios from "axios";

const AddTicket = () => {
    const error = useActionData()
    return <div className="mt-[15vh]">
        <h1 className="text-4xl font-bold text-red-400 my-4 font-mono text-center">Add Ticket</h1>
        <Form className="w-3/4 mx-auto bg-teal-100 p-[7%] pt-8 rounded-md" method="POST" action="/users/add-ticket/">
            <TrainSearchInput />
            <DepartureStationInput />
            <ArrivalStationInput />
            <div className="columns-1 md:columns-2">
                <div className="w-full text-center">
                    <label htmlFor="departure_time">Departure time : </label>
                    <DateTimePicker name="departure_time" id="departure_time" />
                </div>
                <div className="w-full text-center">
                    <label htmlFor="arrival_time">Arrival time : </label>
                    <DateTimePicker name="arrival_time" />
                </div>
            </div>
            <div className="text-center">
                <TextField name="price" style={{ marginTop: "5%", }} id="price" label="Price" variant="outlined" />
            </div>
            {error ? <p className="text-red-500" >{error}</p> : <></>}
            <Button type="submit" variant="contained" sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>Submit</Button>
        </Form>
    </div>
}


export const addTicketAction = async ({ request }) => {
    const form_data = await request.formData()
    const access_token = localStorage.getItem("access_token")
    let trainName = form_data.get('trainName')
    let trainNo = trainName.slice(-5)
    let arrival_station = form_data.get("arrival_station")
    let departure_station = form_data.get("departure_station")

    let departure_time = form_data.get("departure_time")
    departure_time = departure_time.split(" ");
    departure_time = `${departure_time[0]}T${departure_time[1]}Z`

    let arrival_time = form_data.get("arrival_time")
    arrival_time = arrival_time.split(" ");
    arrival_time = `${arrival_time[0]}T${arrival_time[1]}Z`
    const user_id = jwtDecode(access_token).user_id
    const price = form_data.get("price")

    const data = {
        user: user_id,
        train_number: trainNo,
        train_name: trainName,
        departure_station: departure_station,
        arrival_station: arrival_station,
        departure_time: departure_time,
        arrival_time: arrival_time,
        price: price,
        class_type: "sleeper"
    }

    console.log(data);
    let response = await axios.post('http://127.0.0.1:8000/tickets/list-create-tickets/', data, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    if (response.status == 201) {
        return <Navigate to="/users/show-tickets/" />
    }
    else {
        let error = ["something went wrong"]
        return error;
    }
}

export default AddTicket;