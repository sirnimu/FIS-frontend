import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import PhishingIcon from "@mui/icons-material/Phishing";
import React from "react";

type Props = {
  children: ReactNode;
};

const Page: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", width: "auto", background: "#eee" }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Stack justifyContent="space-between" sx={{ width: "100%" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Stack>
                <PhishingIcon sx={{ color: "white", mr: 1 }} />
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                  }}
                >
                  Fishingis
                </Typography>
              </Stack>
            </Link>
            <Stack>
              <Button
                sx={{
                  color: "white",
                }}
                onClick={() => navigate("/")}
              >
                Notes
              </Button>
              <Button
                sx={{
                  color: "white",
                }}
                onClick={() => navigate("/locations")}
              >
                Locations
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container sx={{ p: 2 }}>{children}</Container>
    </Box>
  );
};

export default Page;
