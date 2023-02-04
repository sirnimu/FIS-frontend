import { FC } from "react";
import { Typography, CssBaseline, Container } from "@mui/material";
import { AppToolbar, Toolbar } from "./AppToolbar";
import ThemeProvider from "../contexts/ThemeProvider";

export const App: FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />

      <AppToolbar />
      <Toolbar />

      <Container sx={{ my: 4 }}>
        <Typography sx={{ mb: 2 }} variant="body2">
          Notes goes here...
        </Typography>
      </Container>
    </ThemeProvider>
  );
};
