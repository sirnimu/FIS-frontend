import { AppBar, AppBarProps, Toolbar, Typography } from "@mui/material";

import { FC } from "react";
import React from "react";

type Props = AppBarProps;

export const AppToolbar: FC<Props> = (props) => {
  return (
    <AppBar {...props}>
      <Toolbar>
        <Typography variant="h5">Fishing notes</Typography>
      </Toolbar>
    </AppBar>
  );
};

export { Toolbar };
