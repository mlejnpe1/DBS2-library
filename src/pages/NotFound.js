import React from "react";
import { Typography } from "@material-ui/core";

const NotFound = () => {
  return (
    <div>
      <Typography variant="h2">404 - Not Found</Typography>
      <Typography variant="h6">
        URL that you're trying to access has not been found.
      </Typography>
    </div>
  );
};

export default NotFound;
