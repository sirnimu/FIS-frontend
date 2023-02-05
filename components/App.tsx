import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CreateNote from "../routes/CreateNote";
import CreateUser from "../routes/CreateUser";
import { CssBaseline } from "@mui/material";
import { FC } from "react";
import Home from "../routes/Home";
import L from "leaflet";
import { LocalizationProvider } from "@mui/x-date-pickers";
import QueryProvider from "../contexts/QueryProvider";
import React from "react";
import { SnackbarProvider } from "notistack";
import ThemeProvider from "../contexts/ThemeProvider";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet marker hacky fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

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
