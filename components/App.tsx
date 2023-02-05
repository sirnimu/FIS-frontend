import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CreateNote from "../routes/CreateNote";
import CreateUser from "../routes/CreateUser";
import { CssBaseline } from "@mui/material";
import { FC } from "react";
import Home from "../routes/Home";
import { LocalizationProvider } from "@mui/x-date-pickers";
import QueryProvider from "../contexts/QueryProvider";
import React from "react";
import { SnackbarProvider } from "notistack";
import ThemeProvider from "../contexts/ThemeProvider";

export const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/new",
      element: <CreateNote />,
    },
    {
      path: "/user",
      element: <CreateUser />,
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <QueryProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <RouterProvider router={router} />
            <CssBaseline />
          </SnackbarProvider>
        </ThemeProvider>
      </QueryProvider>
    </LocalizationProvider>
  );
};
