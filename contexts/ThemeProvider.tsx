import { FC } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";

type Props = { children: React.ReactNode };

const ThemeProvider: FC<Props> = ({ children }) => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
