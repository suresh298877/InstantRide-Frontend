import { Box } from "@mui/material";
import SimpleBottomNavigation from "../general/SimpleBottomNavigation";
import { useState } from "react";
import { Navigate, Outlet, useNavigation } from "react-router-dom";


const Home = () => {
    const [tab, setTab] = useState(0);
    return <>
        <Box className="width-full max-w-[90vw] mx-auto  pb-20 bg-slate-400" sx={{ marginTop: "65px" }}>
            {/* {tab == 0 ? <h1>Tickets</h1> : <AddTicket />} */}
            {tab == 0 ? <Navigate to="/users/show-tickets/" /> : tab == 1 ? <Navigate to="/users/add-ticket/" /> : <Navigate to="/users/my-tickets/" />}
            <Outlet />
            <SimpleBottomNavigation setTab={setTab} />
        </Box>
    </>
}

export default Home;