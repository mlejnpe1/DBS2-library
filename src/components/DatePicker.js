import React, { useState } from "react";
import "../assets/DatePicker.css";
import { Button, Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { CREATE_RESERVATION } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import moment from "moment";

function DatePicker(props) {
  const [createReservation] = useMutation(CREATE_RESERVATION);
  const [selectedDate, setSelectedDate] = useState(moment().format());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReservation = (e) => {
    e.preventDefault();
    const dateFrom = moment(selectedDate).format();
    const dateTo = moment(selectedDate).add(30, "days"); //.calendar().format();

    const res = createReservation({
      variables: {
        dateFrom: dateFrom,
        dateTo: dateTo,
        publicationId: parseInt(props.pId),
        userId: parseInt(sessionStorage.getItem("id")),
        returned: false,
      },
    })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          return error.message;
        });
      })
      .then((reservation) => {});
  };

  return (
    <div className="datepicker-wrapper">
      <Typography component={"span"} variant="h5" color="primary">
        Přejete si vypůjčit?
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Zvolte datum (mm/dd/YYYY)"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Button variant="contained" color="primary" onClick={handleReservation}>
        Vypůjčit
      </Button>
    </div>
  );
}

export default DatePicker;
