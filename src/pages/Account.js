import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Typography, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import "../assets/Account.css";
import "../assets/Form.css";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_USER } from "../graphql/queries";
import { DELETE_RESERVATION } from "../graphql/mutations";
import { formatDate } from "../services/utils";
import { Link } from "react-router-dom";

const DeleteReservation = () => {};

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
    field: "id",
    headerName: "Vrátit",
    width: 150,
    valueGetter: (params) => {
      return (
        <Button
          variant="contained"
          color="primary"
          value={params.row.id}
          onClick={DeleteReservation()}
        >
          Vrátit položku
        </Button>
      );
    },
  },
];

const Account = () => {
  const [createReservation] = useMutation(DELETE_RESERVATION);
  const { error, loading, data } = useQuery(LOAD_USER, {
    variables: {
      id: 7,
    },
  });
  const [user, setUser] = useState({});
  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
    console.log(data);
  }, [data]);

  if (error) return `Error! ${error.message}`;
  if (loading) return "Loading...";
  return (
    <>
      <Navbar />
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
              <div className="button">
                  <Link to="/createAthr">
                    <Button variant="contained" color="primary">
                      Přidat Autora
                    </Button>
                  </Link>
                </div>
                <div className="button">
                  <Link to="/createPub">
                    <Button variant="contained" color="primary">
                      Vytvořit položku
                    </Button>
                  </Link>
                </div>
            </div>
            <div id="reservations">
              {user.reservations && (
                <DataGrid
                  className="grid-height"
                  rows={user.reservations}
                  columns={columns}
                />
              )}
            </div>
          </div>
        )}
    </>
  );
};

export default Account;
