import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Typography, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import "../assets/Account.css";
import "../assets/Form.css";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_USER } from "../graphql/queries";
import { UPDATE_RESERVATION, DELETE_RESERVATION } from "../graphql/mutations";
import { formatDate } from "../services/utils";
import { Link } from "react-router-dom";

const Account = () => {
  const [updateReservation] = useMutation(UPDATE_RESERVATION);
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
      field: "debt",
      headerName: "Dluh",
      width: 150,
    },
    {
      field: "",
      headerName: "Vrátit položku",
      sortable: false,
      width: 175,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          console.log(params);
          const res = updateReservation({
            variables: {
              id: parseInt(params.row.id),
              dateFrom: params.row.dateFrom,
              dateTo: params.row.dateTo,
              publicationId: params.row.publicationId,
              userId: params.row.userId,
              returned: true,
            },
          })
            .catch((res) => {
              const errors = res.graphQLErrors.map((error) => {
                return error.message;
              });
            })
            .then((bookReturnData) => {
              console.log(bookReturnData);
            });
        };
        return (
          <Button variant="contained" color="primary" onClick={onClick}>
            Vrátit
          </Button>
        );
      },
    },
  ];

  const Account = () => {
    const [createReservation] = useMutation(DELETE_RESERVATION);
    console.log(sessionStorage.getItem("id"));
    const { error, loading, data } = useQuery(LOAD_USER, {
      variables: {
        id: parseInt(sessionStorage.getItem("id")),
      },
    });

    const isAdmin = () => {
      if (sessionStorage.getItem("role") === "admin") {
        return (
          <>
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
          </>
        );
      }
    };
    const [user, setUser] = useState({});
    useEffect(() => {
      if (data) {
        setUser(data.user);
        console.log(data);
      }
    }, [data]);

    const countDebt = () => {
      var total = 0;

      data.user.reservations.map((reservation) => (total += reservation.debt));
      return total;
    };

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
              <Typography variant="h6">
                Dluh: <br />
                {countDebt()}
              </Typography>
              <div className="button">
                <Link to="/createAthr">
                  <Button variant="contained" color="primary">
                    Přidat Autora
                  </Button>
                </Link>
              </div>
              <div className="button">
                <Link to="/createPublisher">
                  <Button variant="contained" color="primary">
                    Přidat vydavatelství
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
};

export default Account;
