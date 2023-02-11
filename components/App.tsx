import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CssBaseline } from "@mui/material";
import { FC } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import QueryProvider from "../contexts/QueryProvider";
import React from "react";
import RouterProvider from "../contexts/RouterProvider";
import { SnackbarProvider } from "notistack";
import ThemeProvider from "../contexts/ThemeProvider";

export const App: FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <QueryProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <RouterProvider />
            <CssBaseline />
          </SnackbarProvider>
        </ThemeProvider>
      </QueryProvider>
    </LocalizationProvider>
  );
};
