import type {} from "@mui/x-date-pickers/themeAugmentation";

import { amber, indigo } from "@mui/material/colors";

import { FC } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import React from "react";
import { createTheme } from "@mui/material";

type Props = { children: React.ReactNode };

const ThemeProvider: FC<Props> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[500],
      },
      secondary: {
        main: amber[700],
      },

      mode: "light",
    },
    components: {
      MuiStack: {
        defaultProps: {
          direction: "row",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      MuiDatePicker: {
        styleOverrides: {
          root: {
            backgroundColor: "red",
          },
        },
      },
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
