import React from "react";
import { Typography } from "@material-ui/core";

const NotFound = () => {
  return (
    <div>
      <Typography component={'span'} variant="h2">404 - Not Found</Typography>
      <Typography component={'span'} variant="h6">
        URL that you're trying to access has not been found.
      </Typography>
    </div>
  );
};

export default NotFound;
