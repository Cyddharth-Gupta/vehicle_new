import React from 'react';
import { format } from "date-fns";
import TextField from '@mui/material/TextField'; 

const DateTimeInput = ({ value, onDateChange }) => {
    return (
      <TextField
        type="datetime-local"
        value={value ? format(new Date(value), "yyyy-MM-dd'T'HH:mm") : ""}
        onChange={(e) => onDateChange(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    );
  };
  export default DateTimeInput;