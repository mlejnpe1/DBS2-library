import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations";
import { Redirect, useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "white",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [logoutQuery] = useMutation(LOGOUT);
  const history = useHistory();

  const isLoggedIn = () => {
    if (sessionStorage.getItem("username") !== null) {
      return (
        <div>
          <Link
            to={{
              pathname: "/account",
              state: { uId: sessionStorage.getItem("id") },
            }}
          >
            <MenuItem onClick={handleMenuClose}>Účet</MenuItem>
          </Link>
          <div>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                signOut();
              }}
            >
              Odhlásit se
            </MenuItem>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/login">
            <MenuItem onClick={handleMenuClose}>Přihlášení</MenuItem>
          </Link>
          <Link to="/register">
            <MenuItem onClick={handleMenuClose}>Registrace</MenuItem>
          </Link>
        </div>
      );
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("username");
    history.push("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn()}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography
              component={"span"}
              className={classes.title}
              variant="h6"
              noWrap
            >
              Knihovna
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
