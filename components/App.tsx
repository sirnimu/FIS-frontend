import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CssBaseline } from "@mui/material";
import { FC } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import NoteForm from "./notes/NoteForm";
import Notes from "./notes/Notes";
import Page from "./ui/Page";
import QueryProvider from "../contexts/QueryProvider";
import React from "react";
import { SnackbarProvider } from "notistack";
import ThemeProvider from "../contexts/ThemeProvider";
import UserForm from "./user/UserForm";

export const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Page>
          <Notes />
        </Page>
      ),
    },
    {
      path: "/note",
      element: (
        <Page>
          <NoteForm />
        </Page>
      ),
    },
    {
      path: "/user",
      element: (
        <Page>
          <UserForm />
        </Page>
      ),
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
