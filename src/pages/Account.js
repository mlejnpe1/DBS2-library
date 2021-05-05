import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import "../assets/Account.css";
import "../assets/Form.css";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_RESERVATIONS, LOAD_USER } from "../graphql/queries";
import { UPDATE_RESERVATION } from "../graphql/mutations";
import { Link } from "react-router-dom";
import moment from "moment";

const Account = () => {
  const classes = useStyles();
  const [
    updateReservation,
    { error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_RESERVATION);
  const {
    error: reservationError,
    loading: reservationLoading,
    data: reservationData,
  } = useQuery(LOAD_RESERVATIONS);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Název",
      width: 250,
      valueGetter: (params) => {
        return params.row.publication.name;
      },
    },
    {
      field: "dateFrom",
      headerName: "Od",
      width: 175,
      valueGetter: (params) => {
        return moment(params.row.dateFrom).format("DD. MM. YY, HH:mm:ss");
      },
    },
    {
      field: "dateTo",
      headerName: "Do",
      width: 175,
      valueGetter: (params) => {
        return moment(params.row.dateTo).format("DD. MM. YY, HH:mm:ss");
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
          const res = updateReservation({
            variables: {
              id: parseInt(params.row.id),
              dateFrom: params.row.dateFrom,
              dateTo: params.row.dateTo,
              publicationId: parseInt(params.row.publication.id),
              userId: params.row.userId,
              returned: true,
              debt: parseFloat("0"),
            },
          })
            .catch((res) => {
              const errors = res.graphQLErrors.map((error) => {
                return error.message;
              });
            })
            .then((bookReturnData) => {});
        };
        if (sessionStorage.getItem("role") === "ADMIN") {
          if (params.row.bookReturned) {
            return (
              <Button variant="outlined" color="primary">
                Vráceno
              </Button>
            );
          } else {
            return (
              <Button variant="contained" color="primary" onClick={onClick}>
                Vrátit
              </Button>
            );
          }
        }
      },
    },
  ];
  if (sessionStorage.getItem("role") === "ADMIN") {
    columns.splice(1, 0, {
      field: "username",
      headerName: "Uživ. jméno",
      width: 200,
      valueGetter: (params) => {
        return params.row.user.username;
      },
    });
  }

  console.log(sessionStorage.getItem("id"));
  const { error: userError, loading: userLoading, data: userData } = useQuery(
    LOAD_USER,
    {
      variables: {
        id: parseInt(sessionStorage.getItem("id")),
      },
    }
  );

  const isAdmin = () => {
    if (sessionStorage.getItem("role") === "ADMIN") {
      return (
        <>
          <Link to="/createAthr">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Přidat Autora
            </Button>
          </Link>
          <Link to="/createPublisher">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Vytvořit vydavatelství
            </Button>
          </Link>
          <Link to="/createPub">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Vytvořit položku
            </Button>
          </Link>
          <Link to="/createCat">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Vytvořit Kategorií
            </Button>
          </Link>
        </>
      );
    }
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    if (userData) {
      setUser(userData.user);
    }
  }, [userData]);

  const countDebt = () => {
    var total = 0;

    userData.user.reservations.map(
      (reservation) => (total += reservation.debt)
    );
    return total;
  };

  if (userError) return `Error! ${userError.message}`;
  if (reservationError) return `Error! ${reservationError.message}`;
  if (updateError) return `Error! ${updateError.message}`;
  if (userError) return `Error! ${userError.message}`;
  if (userLoading || reservationLoading || updateLoading) return "Loading...";
  return (
    <>
      <Navbar />
      {user && (
        <div id="account">
          <div id="credentials">
            <Typography component={"span"} variant="h3">
              Vaš účet
            </Typography>
            <Typography component={"span"} variant="h6">
              Uživatelské jméno: <br />
              {userData.user.username}
            </Typography>
            <Typography component={"span"} variant="h6">
              E-mail: <br />
              {userData.user.email}
            </Typography>
            <Typography component={"span"} variant="h6">
              Tel. číslo: <br />
              {userData.user.telNumber
                ? userData.user.telNumber
                : "Není uvedeno"}
            </Typography>
            <Typography component={"span"} variant="h6">
              Dluh: <br />
              {countDebt()}
            </Typography>
            {isAdmin()}
          </div>
          <div id="reservations">
            {
              <DataGrid
                className="grid-height"
                rows={
                  sessionStorage.getItem("role") === "ADMIN"
                    ? reservationData.reservations
                    : userData.user.reservations
                }
                columns={columns}
              />
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Account;

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    margin: "5px",
  },
}));
