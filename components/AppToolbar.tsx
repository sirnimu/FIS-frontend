import { FC } from "react";
import { Typography, Toolbar, AppBar, AppBarProps } from "@mui/material";

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
