import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { StylesProvider } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import "../assets/Account.css";
import { useQuery } from "@apollo/client";
import { LOAD_USER } from "../graphql/queries";
import { DELETE_RESERVATION } from "../graphql/mutations";

const formatDate = (d) => {
  const date = new Date(d);
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.getMonth();
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  return formattedDate.toString();
};

const DeleteReservation = () => {
  const { reservation } = useQuery(DELETE_RESERVATION(reservationId)) //TODO: reservationId
  const [reservationId, setReservationId] = useState({});
  useEffect(()=> {
    if (reservation){
      setReservationId(reservation.id);
    }
    console.log(reservation)
  }, [reservation]);
}

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Název",
    width: 300,
    valueGetter: (params) => {
      return params.row.publication.name;
    },
  },
  {
    field: "dateFrom",
    headerName: "Od",
    width: 150,
    valueGetter: (params) => {
      return formatDate(params.row.dateFrom);
    },
  },
  {
    field: "dateTo",
    headerName: "Do",
    width: 150,
    valueGetter: (params) => {
      return formatDate(params.row.dateTo);
    },
  },
  {
    field: "returnButton",
    headerName: "Vrátit",
    width: 150,
    valueGetter: () => {
      return <Button 
      variant="contained"
      color="primary"
      onClick={DeleteReservation()}
      >Vrátit položku
      </Button>;
    },
  }
];

const Account = () => {
  const { data } = useQuery(LOAD_USER(2));
  const [user, setUser] = useState({});
  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
    console.log(data);
  }, [data]);

  return (
    <>
      <Navbar />
      <StylesProvider injectFirst>
        {user && (
          <div id="account">
            <div id="credentials">
              <Typography variant="h3">Vaš účet</Typography>
              <Typography variant="h6">
                Uživatelské jméno: <br />
                {user.username}
              </Typography>
              <Typography variant="h6">
                E-mail: <br />
                {user.email}
              </Typography>
              <Typography variant="h6">
                Tel. číslo: <br />
                {user.telNumber ? user.telNumber : "Není uvedeno"}
              </Typography>
            </div>
            <div id="reservations">
              {user.reservations && (
                <DataGrid rows={user.reservations} columns={columns} />
              )}
            </div>
          </div>
        )}
      </StylesProvider>
    </>
  );
};

export default Account;
