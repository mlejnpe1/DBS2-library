import React from 'react';
import { Typography, TextField, MenuItem, Select, InputLabel, FormControlLabel, Checkbox, Button} from '@material-ui/core';
import './FillterMenu.css';

function FillterMenu() {

  const [age, setAge] = React.useState('');
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const handleCheckChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


    return (
        <div className="fillter-container">
            <div className="fillter-wrapper">
                <Typography className="mobile-h5" variant="h5">Lookin for something?</Typography>
            </div>
            <div className="fillter-wrapper">
                <div className="fields">
                    <TextField size="small" id="outlined-basic" label="Title" variant="standard"/>
                </div>
                <div className="fields">
                    <TextField size="small" id="outlined-basic" label="Author" variant="standard" />
                </div>
            </div>
            <div className="divider"></div>
            <div className="fillter-wrapper">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    className="fillter-select"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleSelectChange}
                >
                    <MenuItem value={0}>Action/Adventure</MenuItem>
                    <MenuItem value={1}>Classic</MenuItem>
                    <MenuItem value={2}>Comic Book/Graphical Novel</MenuItem>
                    <MenuItem value={3}>Fantasy</MenuItem>
                    <MenuItem value={4}>Historical Fiction</MenuItem>
                    <MenuItem value={5}>Horror</MenuItem>
                    <MenuItem value={6}>Literary Fiction</MenuItem>
                    <MenuItem value={7}>Science Fiction</MenuItem>
                    <MenuItem value={8}>Detective/Mystery</MenuItem>
                </Select>
                <FormControlLabel
                id="checkbox"
                control={
                    <Checkbox
                        id="checkbox"
                        checked={state.checkedB}
                        onChange={handleCheckChange}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Available"
                />
                <Button id="button" variant="contained" color="primary">Filter Items</Button>
            </div>
        </div>
    )
}

export default FillterMenu
