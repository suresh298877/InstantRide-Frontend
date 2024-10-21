import { Box, Divider, Paper } from "@mui/material"
import TicketCard from "./TicketCard"
import { useEffect, useState } from "react"
import LoadinButton from "./LoadingButton";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const ListMyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const user_id = jwtDecode(access_token).user_id
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/tickets/list-create-tickets/?user_id=${user_id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                // console.log(response);
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return <>
        <h1 className="text-center text-3xl antialiased font-mono font-black pt-10 pb-4 text-green-400">Tickets</h1>
        {loading ? <LoadinButton /> : tickets.map((ticket) => <TicketCard edit="true" data={ticket} />)}
    </>

}

export default ListMyTickets;