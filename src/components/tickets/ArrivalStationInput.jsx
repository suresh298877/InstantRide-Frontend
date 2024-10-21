import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

export default function ArrivalStationInput({ data }) {
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState(null)
    const [inputValue, setInputValue] = React.useState(null);
    const [label, setLabel] = React.useState(data ? data.arrival_station : "Enter Arrival Station")

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/railways/api/SolrSearch?search=${inputValue}`);
                setOptions(response.data.response.docs);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (inputValue != "") {
            fetchData();
        }
    }, [inputValue]);
    return (
        <Autocomplete
            popupIcon=<SearchIcon />
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            sx={{ width: "50%" }}
            className='mx-auto my-7'
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => `${option.stationName} - ${option.stationCode} - ${option.alias1}`}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    onFocus={() => { setLabel("Enter Arrival Station") }}
                    label={label}
                    name='arrival_station'
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        },
                    }}
                />
            )}
        />
    );
}