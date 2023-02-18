import {
  RouterProvider as DOMRouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { FC } from "react";
import Locations from "../components/locations/Locations";
import Login from "../components/auth/Login";
import NoteForm from "../components/note/form/NoteForm";
import Notes from "../components/note/Notes";
import Page from "../components/Page";
import React from "react";
import SignUp from "../components/auth/SignUp";

const RouterProvider: FC = () => {
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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/note",
      element: (
        <Page>
          <NoteForm />
        </Page>
      ),
      children: [
        {
          path: ":noteId",
          element: (
            <Page>
              <NoteForm />
            </Page>
          ),
        },
      ],
    },
    {
      path: "/locations",
      element: (
        <Page>
          <Locations />
        </Page>
      ),
    },
  ]);

  return <DOMRouterProvider router={router} />;
};

export default RouterProvider;
