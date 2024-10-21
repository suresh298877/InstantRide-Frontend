import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

export default function TrainSearch({ data }) {
    // console.log(data.train_name)
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState(null);
    const [label, setLabel] = React.useState(data ? data.train_name : "Enter train Name or Number")

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/railways/api/SolrTrainSearch?search=${inputValue}`);
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
            className='mx-auto'
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => `${option.trainName} - ${option.trainNo}`}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    onFocus={() => { setLabel("Enter Train Name or Number") }}
                    required
                    {...params}
                    label={label}
                    name='trainName'
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