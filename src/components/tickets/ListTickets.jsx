import { Box, Divider, Paper } from "@mui/material"
import TicketCard from "./TicketCard"
import { useEffect, useState } from "react"
import LoadinButton from "./LoadingButton";
import axios from "axios";


const ListTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://127.0.0.1:8000/tickets/list-create-tickets/", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
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
        {loading ? <LoadinButton /> : tickets.map((ticket) => <TicketCard data={ticket} />)}
    </>

}

export default ListTickets;