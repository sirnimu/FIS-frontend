import { AppToolbar, Toolbar } from "./AppToolbar";
import { Box, Button, Container, Fab, Stack } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";
import { FC } from "react";
import Notes from "./notes/Notes";
import React from "react";

const Main: FC = () => {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", width: "auto", background: "#eee" }}
    >
      <AppToolbar />
      <Toolbar />
      <Container sx={{ my: 4 }}>
        <Notes />
      </Container>
    </Box>
  );
};

export default Main;
