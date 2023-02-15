import {
  RouterProvider as DOMRouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { FC } from "react";
import Locations from "../components/locations/Locations";
import NoteForm from "../components/note/NoteForm";
import Notes from "../components/note/Notes";
import Page from "../components/Page";
import React from "react";
import UserForm from "../components/user/UserForm";

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
