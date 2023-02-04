import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";

import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import React from "react";

type Props = {
  children: ReactNode;
};

const Page: FC<Props> = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", width: "auto", background: "#eee" }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Stack justifyContent="space-between" sx={{ width: "100%" }}>
            <Typography variant="h5">Fishing notes</Typography>
            <Link to="/">
              <IconButton sx={{ color: "white" }}>
                <HomeIcon />
              </IconButton>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container sx={{ p: 2 }}>{children}</Container>
    </Box>
  );
};

export default Page;
