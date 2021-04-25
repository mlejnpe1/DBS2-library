import React, { useEffect, useState } from "react";
import faker from "faker";
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

import { useQuery } from "@apollo/client";
import { LOAD_PUBLICATIONS } from "../graphql/queries";

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
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
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
          <Typography>{children}</Typography>
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

function Cards() {
  const classes = useStyles();

  const { error, loading, data } = useQuery(LOAD_PUBLICATIONS);
  const [publications, setPublications] = useState([]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (data) {
      setPublications(data.publications);
    }
    console.log(data);
  }, [data]);
  console.log(error);
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
        <TabPanel value={value} index={0}>
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={4}>
              {publications.map(
                (tile) =>
                  tile.bookId && (
                    <GridListTile classname={classes.tile} key={tile.b}>
                      <img src={tile.image?.img} alt={tile.title} />
                      <Link
                        to={{ pathname: "/detail", state: { id: tile.id } }}
                      >
                        <GridListTileBar
                          title={tile.name}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title,
                          }}
                        />
                      </Link>
                    </GridListTile>
                  )
              )}
            </GridList>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={4}>
              {publications.map(
                (tile) =>
                  tile.magazineId && (
                    <GridListTile classname={classes.tile} key={tile.id}>
                      <img src={tile.image?.img} alt={tile.title} />
                      <Link
                        to={{
                          pathname: "/detail",
                          state: { id: tile.id },
                        }}
                      >
                        <GridListTileBar
                          title={tile.name}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title,
                          }}
                        />
                      </Link>
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
