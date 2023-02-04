import { FC } from "react";

import { Container } from "@mui/material";
import { AppToolbar, Toolbar } from "./AppToolbar";
import Notes from "./notes/Notes";

const Main: FC = () => {
  return (
    <>
      <AppToolbar />
      <Toolbar />
      <Container sx={{ my: 4 }}>
        <Notes />
      </Container>
    </>
  );
};

export default Main;
