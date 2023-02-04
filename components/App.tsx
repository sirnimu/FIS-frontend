/* SPDX-FileCopyrightText: 2021 @koistya */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import { Typography, CssBaseline, Container } from "@mui/material";
import { Combobox } from "./Combobox";
import { AppToolbar, Toolbar } from "./AppToolbar";
import { ThemeProvider } from "./ThemeProvider";

/**
 * The top-level (root) React component.
 *
 * @see https://reactjs.org/
 * @see https://mui.com/core/
 */
export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <CssBaseline />

      <AppToolbar />
      <Toolbar />

      <Container sx={{ my: 4 }}>
        <Typography sx={{ mb: 2 }} variant="body2">
          Material UI Autocomplete playground 😁 See{" "}
          <b>
            <code>./components/Combobox.tsx</code>
          </b>
        </Typography>

        <Combobox />
      </Container>
    </ThemeProvider>
  );
}
