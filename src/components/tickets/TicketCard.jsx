import { Box, Paper } from "@mui/material"

const TicketCard = ({ data }) => {

    console.log(data);
    return <>
        <Box
            className="w-full inline-block max-w-[70vw] mx-auto hover:opacity-50"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1
                },
            }}
        >
            <Paper className="w-full max-w-[70vw]" elevation={2} >
                <h1 className="text-center text-2xl font-mono font-black">{data.train_name}</h1>

                <div className="columns-1 md:columns-2 my-3">
                    <div className="w-full text-center py-2">
                        <h1>Departure</h1>
                        <p className="font-mono font-black text-xl">{data.departure_station}</p>
                        <Box className="font-thin">{data.departure_time}</Box>
                    </div>
                    <div className="w-full text-center py-2">
                        <div>
                            <h1>Arrival</h1>
                            <p className="font-mono font-black text-xl">{data.arrival_station}</p>
                            <Box className="font-thin">{data.arrival_time}</Box>
                        </div>
                    </div>
                </div>
                <Box className="text-center mb-3 text-xl">{data.price}</Box>
            </Paper>
        </Box >
    </>
}

export default TicketCard;