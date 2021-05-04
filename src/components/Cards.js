import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { StylesProvider, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "78.3vh",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  title: {
    color: theme.palette.primary,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  tabPanel: {
    width: "100%",
  },
  img: {
    maxHeight: "100%",
    backgroundSize: "contain",
    width: "auto",
    display: "block",
    margin: "auto",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Cards(props) {
  const classes = useStyles();

  const [publications, setPublications] = useState([]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StylesProvider injectFirst>
      <div className="cards">
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Knihy" {...a11yProps(0)} />
            <Tab label="Magazíny" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel className={classes.tabPanel} value={value} index={0}>
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={4}>
              {props.data.publications.map(
                (tile) =>
                  tile.bookId && (
                    <GridListTile
                      component={Link}
                      to={{ pathname: "/detail", state: { id: tile.id } }}
                      style={{ height: "300px" }}
                      className={classes.tile}
                      key={tile.id}
                    >
                      <img
                        className={classes.img}
                        src={tile.image?.img}
                        alt="nenalezen"
                      />
                      <GridListTileBar
                        key={tile.id}
                        title={tile.name}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                      />
                    </GridListTile>
                  )
              )}
            </GridList>
          </div>
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={value} index={1}>
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={4}>
              {props.data.publications.map(
                (tile) =>
                  tile.magazineId && (
                    <GridListTile
                      component={Link}
                      to={{ pathname: "/detail", state: { id: tile.id } }}
                      style={{ height: "300px" }}
                      className={classes.tile}
                      key={tile.id}
                    >
                      <img
                        className={classes.img}
                        src={tile.image?.img}
                        alt="nenalezen"
                      />
                      <GridListTileBar
                        title={tile.name}
                        key={tile.id}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                      />
                    </GridListTile>
                  )
              )}
            </GridList>
          </div>
        </TabPanel>
      </div>
    </StylesProvider>
  );
}

export default Cards;
